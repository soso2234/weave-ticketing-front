<template>
  <div class="page">
    <header class="topbar">
      <button class="back" @click="goHome">←</button>
      <div class="title">대기열</div>
      <div class="spacer"></div>
    </header>

    <main class="main">
      <div class="card">
        <div class="topText">거의 다 왔어요.<br /></div>

        <div class="label">나의 대기순서</div>
        <div class="num">{{ myNumberDisplay }}</div>

        <div class="bar">
          <div class="fill" :style="{ width: progress + '%' }"></div>
        </div>

        <div class="desc">
          현재 접속 인원이 많아 대기중입니다.<br />
          잠시만 기다려주시면 예매하기 페이지로 연결됩니다.
        </div>

        <div class="hint">
          새로고침 하거나 재접속 하시면 대기순서가 초기화되어 대기시간이 더 길어집니다.
        </div>

        <!-- 선택: 상태/에러 표시 -->
        <div v-if="error" style="color:crimson; margin-top:12px">{{ error }}</div>
        <div v-else style="opacity:0.8; margin-top:12px">
          상태: {{ status || '-' }}
          <span v-if="estimatedWaitSec !== null"> · 예상 {{ estimatedWaitSec }}초</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 백엔드가 다른 프로젝트/서버라 full URL 사용(클라우드 올릴시 domain 주소로 변경)
const API_BASE = 'http://localhost:3000'

// 화면 표시값들
const myNumber = ref(null)          // 서버 position
const initial = ref(null)           // 최초 position (progress 계산용)
const status = ref('')
const estimatedWaitSec = ref(null)
const error = ref('')
const loading = ref(false)

let timer = null

const myNumberDisplay = computed(() => {
  if (myNumber.value === null) return '...'
  return myNumber.value
})

const progress = computed(() => {
  if (initial.value === null || initial.value <= 0) return 0
  if (myNumber.value === null) return 0
  const done = initial.value - myNumber.value
  return Math.min(100, Math.max(0, Math.round((done / initial.value) * 100)))
})

function goHome() {
  router.push('/')
}

function getQueueToken() {
  return route.query.token || localStorage.getItem('queueToken')
}

async function fetchStatus() {
  const token = getQueueToken()
  if (!token) {
    error.value = 'queueToken이 없습니다. 처음 화면에서 다시 진입하세요.'
    return
  }

  // 중복 호출 방지(네트워크 느릴 때)
  if (loading.value) return
  loading.value = true
  error.value = ''

  try {
    const resp = await fetch(
      `${API_BASE}/queue/status?token=${encodeURIComponent(token)}`
    )
    if (!resp.ok) {
      const t = await resp.text().catch(() => '')
      throw new Error(`status failed: ${resp.status} ${t}`)
    }
    const data = await resp.json()

    status.value = data.status || ''
    estimatedWaitSec.value = data.estimatedWaitSec ?? null

    // position 갱신
    if (typeof data.position === 'number') {
      myNumber.value = data.position
      if (initial.value === null) initial.value = data.position
    }

    // 입장 허용되면 reservation/start 호출 → booking으로 이동
    if (data.status === 'ADMITTED' && data.admissionToken) {
      await startReservationAndMove(data.admissionToken)
    }
  } catch (e) {
    console.error(e)
    error.value = '상태 조회에 실패했습니다. 백엔드(3000)/CORS를 확인하세요.'
  } finally {
    loading.value = false
  }
}

async function startReservationAndMove(admissionToken) {
  // 폴링 중단(중복 이동 방지)
  if (timer) {
    clearInterval(timer)
    timer = null
  }

  const resp = await fetch(`${API_BASE}/reservation/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ admissionToken }),
  })

  if (!resp.ok) {
    const t = await resp.text().catch(() => '')
    throw new Error(`reservation/start failed: ${resp.status} ${t}`)
  }

  const data = await resp.json()
  // 예약 세션 저장(원하면)
  localStorage.setItem('reservationId', data.reservationId)

  router.replace({
    path: '/booking',
    query: {
      showId: route.query.showId || '',
      reservationId: data.reservationId,
    },
  })
}

onMounted(async () => {
  // 즉시 1번 조회 후 폴링 시작
  await fetchStatus()
  timer = setInterval(fetchStatus, 1000) // 1초 폴링(ms단위)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped src="./QueuePage.css"></style>
