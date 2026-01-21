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
        <div class="num">{{ myNumber }}</div>

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
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const myNumber = ref(Math.floor(Math.random() * 300) + 1)
const initial = ref(myNumber.value)
let timer = null

const progress = computed(() => {
  return Math.min(
    100,
    Math.round(((initial.value - myNumber.value) / initial.value) * 100)
  )
})

function goHome() {
  router.push('/')
}

onMounted(() => {
  timer = setInterval(() => {
    const dec = Math.floor(Math.random() * 7) + 1
    myNumber.value = Math.max(0, myNumber.value - dec)

    if (myNumber.value <= 0) {
      clearInterval(timer)
      timer = null
      router.replace({
        path: '/booking',
        query: { showId: route.query.showId || '' },
      })
    }
  }, 650)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped src="./QueuePage.css"></style>
