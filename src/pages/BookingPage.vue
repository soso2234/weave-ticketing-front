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

const seats = Array.from({ length: 30 }, (_, i) => i + 1)
const selectedSeats = ref(new Set())
const selectedList = computed(() => [...selectedSeats.value].sort((a, b) => a - b))
const modalOpen = ref(false)
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
  router.push('/')
}

function goHome() {
  router.push('/')
}
</script>

<style scoped src="../assets/styles/BookingPage.css"></style>
