<template>
  <div class="page">
    <header class="topbar">
      <div class="brand" translate="no">티켓 예매</div>
      <button class="login" @click="goLogin" translate="no">로그인</button>
    </header>

    <main class="main">
      <div class="container">
        <section class="grid">
          <article
            v-for="p in posters"
            :key="p.id"
            class="card"
            @click="openPoster(p)"
          >
            <div class="poster">
              <img :src="p.image" :alt="p.title" class="posterImg" />
            </div>

            <div class="meta">
              <div class="title" translate="no">{{ p.title }}</div>
              <div class="sub" translate="no">{{ p.sub }}</div>
            </div>
          </article>
        </section>
      </div>
    </main>

    <div v-if="selected" class="overlay" @click.self="closePoster">
      <div class="focus">
        <button class="x" @click="closePoster" aria-label="close">✕</button>
        <img :src="selected.image" :alt="selected.title" class="focusImg" />
        <button
          class="reserveFloating"
          @click="goQueue(selected)"
          translate="no"
        >
          예매하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import poster1 from '../assets/posters/poster1.jpg'
import poster2 from '../assets/posters/poster2.jpg'
import poster3 from '../assets/posters/poster3.jpg'

const router = useRouter()
const selected = ref(null)

const posters = ref([
  {
    id: 1,
    title: '<센과 치히로의 행방불명>오리지널투어(SPIRITED AWAY)',
    sub: '예술의전당 오페라 극장 2026.02.23',
    image: poster1,
  },
  {
    id: 2,
    title: '뮤지컬<비틀쥬스>',
    sub: 'LG 아트센터 서울 LG SIGNATURE 홀 2026.03.01',
    image: poster2,
  },
  {
    id: 3,
    title: '뮤지컬<물랑루즈!>(Mulin Rouge! The Musical)',
    sub: '블루스퀘어 신한카드홀 2026.03.05',
    image: poster3,
  },
])

function goLogin() {
  router.push('/login')
}
function openPoster(p) {
  selected.value = p
}
function closePoster() {
  selected.value = null
}
function goQueue(p) {
  router.push({ path: '/queue', query: { showId: p.id } })
}
</script>

<style scoped src="./HomePage.css"></style>
