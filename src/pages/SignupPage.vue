<template>
  <div class="page">
    <header class="topbar">
      <button class="back" @click="goLogin">←</button>
      <div class="title">회원가입</div>
      <div class="spacer"></div>
    </header>

    <main class="main">
      <div class="card">
        <div class="logo">weave</div>
        <div class="subtitle">
          이메일로 간편하게
          회원가입을 진행하세요.
        </div>

        <input
          class="input"
          type="name"
          placeholder="이름"
          v-model="name"
        />

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

        <button class="btn primary" @click="signup">
          회원가입
        </button>

        <button class="link" @click="goLogin">
          이미 계정이 있으신가요? 로그인
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

const goLogin = () => router.push('/login')

function signup() {
  if (!email.value || !password.value) {
    alert('이메일과 비밀번호를 입력해주세요')
    return
  }

  // 🔧 지금은 UI용 (백엔드 연결 시 API 호출)
  console.log('signup:', email.value, password.value)

  alert('회원가입 완료! 로그인 페이지로 이동합니다.')
  router.push('/login')
}
</script>

<style scoped src="../assets/styles/SignupPage.css"></style>
