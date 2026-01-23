<template>
  <div class="page">
    <header class="topbar">
      <button class="back" @click="goHome">←</button>
      <div class="title">로그인</div>
      <div class="spacer"></div>
    </header>

    <main class="main">
      <div class="card">
        <div class="logo">weave</div>
        <div class="subtitle">
          간편하게 로그인하고<br />
          다양한 서비스를 이용하세요.
        </div>

        <button class="btn kakao" @click="openKakaoLogin">카카오톡으로 시작</button>
        <button class="btn white">Google로 시작</button>
        <button class="btn white">Apple으로 등록</button>
        <button class="btn white">Facebook으로 시작</button>

        <button class="email">이메일로 로그인하기</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()
const goHome = () => router.push('/')

// 백엔드가 다른 프로젝트/서버라면 full URL 필수(클라우드 올릴시 domain 주소로 변경)
const API_BASE = 'http://localhost:3000'
const BACKEND_ORIGIN = API_BASE // origin 검증용

function openKakaoLogin() {
  const url = `${API_BASE}/auth/kakao`

  const width = 480
  const height = 720
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2

  window.open(
    url,
    'kakaoLogin',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  )
}

// 팝업에서 postMessage로 넘어오는 로그인 성공 신호 처리
function onKakaoMessage(event) {
  // 1) 보낸 쪽(origin) 검증
  if (event.origin !== BACKEND_ORIGIN) return

  // 2) payload 검증
  const data = event.data
  if (!data || data.ok !== true || !data.user?.id) return

  // 3) 로그인 정보 저장(일단 localStorage)
  localStorage.setItem('auth_user', JSON.stringify(data.user))

  // 4) 홈으로 이동
  router.push('/')

  console.log('origin=', event.origin, 'data=', event.data)

}

onMounted(() => {
  window.addEventListener('message', onKakaoMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onKakaoMessage)
})
</script>

<style scoped src="../assets/styles/LoginPage.css"></style>
