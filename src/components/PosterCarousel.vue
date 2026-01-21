<template>
  <section class="carousel">
    <button class="arrow left" @click="prev" :disabled="index <= 0" aria-label="prev">
      ◀
    </button>

    <div class="viewport">
      <div ref="trackEl" class="track" :style="{ transform: `translateX(${-index * 100}%)` }">
        <article class="slide" v-for="item in items" :key="item.id">
          <div class="card">
            <div class="poster">
              <pre class="posterText">{{ item.desc }}</pre>
            </div>

            <div class="bottom">
              <div class="title">{{ item.title }}</div>
              <button class="reserve" @click="$emit('reserve', item)">예매하기</button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <button class="arrow right" @click="next" :disabled="index >= items.length - 1" aria-label="next">
      ▶
    </button>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
})
defineEmits(['reserve'])

const index = ref(0)
const trackEl = ref(null)
let anim = null

function animateTo(nextIndex, dir) {
  if (!trackEl.value) {
    index.value = nextIndex
    return
  }
  if (anim) anim.cancel()

  const from = -index.value * 100
  const to = -nextIndex * 100
  const overshoot = dir === 'next' ? to - 3 : to + 3 // “살짝 튕김” 지점

  // 실제 상태 먼저 바꾸고, 애니메이션은 from -> overshoot -> to로
  index.value = nextIndex

  anim = trackEl.value.animate(
    [
      { transform: `translateX(${from}%)` },
      { transform: `translateX(${overshoot}%)`, offset: 0.75 },
      { transform: `translateX(${to}%)` },
    ],
    { duration: 420, easing: 'cubic-bezier(.2,.9,.2,1)' }
  )
}

function next() {
  if (index.value >= props.items.length - 1) return
  animateTo(index.value + 1, 'next')
}
function prev() {
  if (index.value <= 0) return
  animateTo(index.value - 1, 'prev')
}
</script>

<style scoped>
.carousel {
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  gap: 12px;
  align-items: center;
}

.arrow {
  width: 56px;
  height: 56px;
  border: none;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  cursor: pointer;
  font-size: 22px;
}
.arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.viewport {
  overflow: hidden;
  border-radius: 18px;
}

.track {
  display: flex;
  will-change: transform;
}

.slide {
  min-width: 100%;
  padding: 8px;
}

.card {
  background: #fff;
  border: 1px solid #e7e7ea;
  border-radius: 18px;
  overflow: hidden;
  height: 520px;
  display: grid;
  grid-template-rows: 1fr 160px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.06);
}

.poster {
  display: grid;
  place-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.posterText {
  margin: 0;
  text-align: center;
  font-size: 18px;
  line-height: 1.45;
  color: #333;
  white-space: pre-wrap;
}

.bottom {
  display: grid;
  place-items: center;
  gap: 14px;
}
.title {
  font-size: 26px;
  font-weight: 900;
}
.reserve {
  border: 1px solid #cfcfd6;
  background: #fff;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 800;
}
</style>
