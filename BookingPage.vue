<template>
  <div class="page">
    <header class="header">
      <div class="container headInner">
        <button class="back" @click="goHome">◀</button>
        <div class="headTitle">좌석 선택</div>
        <button class="menu">☰</button>
      </div>

      <div class="container sub">
        <template v-if="selectedList.length">
          <div class="seatLine">
            선택 좌석 : {{ selectedList.join(', ') }}
          </div>
        </template>
        <template v-else>
          <div class="hintText">좌석을 선택해 주세요.</div>
        </template>
      </div>
    </header>

    <main class="container main">
      <div class="stage">Stage</div>

      <div class="grid">
        <button
          v-for="seat in seats"
          :key="seat"
          class="seat"
          :class="{ selected: selectedSeats.has(seat) }"
          @click="toggleSeat(seat)"
        >
          {{ seat }}
        </button>
      </div>
    </main>

    <!-- 선택하면 아래 바 표시 -->
    <div v-if="count > 0" class="bottomBar">
      <div class="bottomInner container">
        <div class="count">총 {{ count }} 매</div>
        <button class="reserve" @click="reserveTicket">티켓 예매</button>
      </div>
    </div>

    <SuccessModal
      :open="modalOpen"
      title="예매 성공!"
      message="예매가 완료되었습니다."
      @close="onCloseModal"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SuccessModal from '../components/SuccessModal.vue'

const router = useRouter()

// 좌석 1~30
const seats = Array.from({ length: 30 }, (_, i) => i + 1)

// 선택 좌석 Set
const selectedSeats = ref(new Set())

// 선택 좌석을 화면에 표시하기 위한 정렬된 배열
const selectedList = computed(() => [...selectedSeats.value].sort((a, b) => a - b))

const modalOpen = ref(false)

// 총 매수
const count = computed(() => selectedSeats.value.size)

function toggleSeat(seat) {
  const next = new Set(selectedSeats.value)
  if (next.has(seat)) next.delete(seat)
  else next.add(seat)
  selectedSeats.value = next
}

function reserveTicket() {
  modalOpen.value = true
}

function onCloseModal() {
  modalOpen.value = false
  router.push('/') // 메인으로
}

function goHome() {
  router.push('/') // 메인으로
}
</script>

<style scoped>
.page { min-height: 100vh; padding-bottom: 92px; }

.container { width: min(1100px, 92vw); margin: 0 auto; }

.header {
  background: #3a3f4b;
  color: #fff;
}
.headInner {
  height: 64px;
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
}
.back, .menu {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}
.headTitle { text-align: center; font-weight: 900; }

.sub {
  padding: 10px 0 14px;
  color: #ffb3b3;
  font-weight: 800;
  line-height: 1.6;
}
.seatLine {
  font-weight: 900;
}
.hintText {
  color: rgba(255, 255, 255, 0.65);
  font-weight: 700;
}

.main { padding: 26px 0 24px; }

.stage {
  text-align: center;
  font-size: 46px;
  font-weight: 900;
  margin: 10px 0 18px;
}

.grid {
  width: min(980px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 12px;
}

.seat {
  height: 48px;
  border: 1px solid #cfcfd6;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 900;
}
.seat.selected {
  background: #ffe66d;
  border-color: #e1c94e;
}

.bottomBar {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 80px;
  background: #e74c3c;
  display: flex;
  align-items: center;
  z-index: 50;
}
.bottomInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.count {
  color: #fff;
  font-size: 22px;
  font-weight: 900;
}
.reserve {
  border: none;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
}

/* 반응형(웹+모바일 대응) */
@media (max-width: 720px) {
  .grid { grid-template-columns: repeat(5, 1fr); }
  .stage { font-size: 38px; }
}
</style>
