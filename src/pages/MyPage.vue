<template>
  <div class="page">
    <header class="topbar">
      <button class="back" @click="$router.back()">←</button>
      <div class="title">마이페이지</div>
      <div class="spacer"></div>
    </header>

    <main class="main">
      <div class="centerCard">
        <!-- 사용자 정보 -->
        <section class="profile">
          <div class="avatar">👤</div>
          <div class="info">
            <div class="name">사용자 님</div>
            <div class="desc">예매내역을 확인할 수 있어요</div>
          </div>
        </section>

        <!-- 예매내역 -->
        <BookingList />
      </div>
    </main>
  </div>
</template>

<script setup>
import BookingList from './BookingList.vue'
</script>

<style scoped src="../assets/styles/MyPage.css"></style>
