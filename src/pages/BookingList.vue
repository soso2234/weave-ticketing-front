<template>
  <section class="bookingSection">
    <h3 class="sectionTitle">나의 예매내역</h3>

    <div
      v-for="item in bookings"
      :key="item.bookingId"
      class="card"
    >
      <img :src="item.poster" class="posterImg" />

      <div class="content">
        <div class="title">{{ item.title }}</div>

        <div class="infoGrid">
          <div class="label">공연일</div>
          <div class="value">{{ item.date }}</div>

          <div class="label">좌석</div>
          <div class="value">{{ item.seat }}번</div>
        </div>

        <div
          class="status"
          :class="item.status === '취소가능' ? 'cancel' : 'done'"
        >
          {{ item.status }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import poster1 from '../assets/posters/poster1.jpg'
import poster2 from '../assets/posters/poster3.jpg'
import poster3 from '../assets/posters/poster6.jpg'

const bookings = [
  {
    bookingId: 1,
    title: '<센과 치히로의 행방불명>',
    date: '2026-01-23',
    seat: 12,
    status: '예매완료',
    poster: poster1,
  },
  {
    bookingId: 2,
    title: '뮤지컬 <물랑루즈!>',
    date: '2026-02-15',
    seat: 7,
    status: '예매완료',
    poster: poster2,
  },
  {
    bookingId: 3,
    title: '뮤지컬 <데스노트>',
    date: '2026-03-04',
    seat: 21,
    status: '취소가능',
    poster: poster3,
  },
]
</script>

<style scoped src="../assets/styles/BookingList.css"></style>
