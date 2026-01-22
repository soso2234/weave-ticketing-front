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

        <button class="btn kakao">카카오톡으로 시작</button>
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
const router = useRouter()
const goHome = () => router.push('/')
</script>

<style scoped src="../assets/styles/LoginPage.css"></style>
