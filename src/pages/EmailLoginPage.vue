<template>
  <div class="page">
    <header class="topbar">
      <button class="back" @click="goBack">←</button>
      <div class="title">이메일 로그인</div>
      <div class="spacer"></div>
    </header>

    <main class="main">
      <div class="card">
        <div class="logo">weave</div>

        <div class="subtitle">
          이메일과 비밀번호로<br />
          로그인하세요.
        </div>

        <input
          class="input"
          type="email"
          placeholder="이메일"
          v-model="email"
        />

        <input
          class="input"
          type="password"
          placeholder="비밀번호"
          v-model="password"
        />

        <button class="btn primary" @click="login">
          로그인
        </button>

        <button class="link" @click="goSignup">
          아직 계정이 없으신가요? 회원가입
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const goBack = () => router.push('/login')
const goSignup = () => router.push('/signup')

function login() {
  if (!email.value || !password.value) {
    alert('이메일과 비밀번호를 입력해주세요')
    return
  }

  // UI 테스트용 (나중에 API로 교체)
  const user = {
    email: email.value,
  }

  localStorage.setItem('auth_user', JSON.stringify(user))
  router.push('/')
}
</script>

<style scoped src="../assets/styles/SignupPage.css"></style>
