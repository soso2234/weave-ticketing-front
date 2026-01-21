<template>
  <div v-if="open" class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <div class="title">{{ title }}</div>
      <div class="msg">{{ message }}</div>
      <button class="ok" @click="$emit('close')">확인</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '성공' },
  message: { type: String, default: '' },
})
defineEmits(['close'])
</script>

<style scoped>
.backdrop{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 999;
}
.modal{
  width: min(420px, 92vw);
  background: #fff;
  border-radius: 16px;
  padding: 20px 18px;
  text-align: center;
  box-shadow: 0 18px 40px rgba(0,0,0,0.18);
}
.title{ font-size: 22px; font-weight: 900; margin-bottom: 8px; }
.msg{ color: #444; margin-bottom: 16px; }
.ok{
  width: 100%;
  height: 46px;
  border: none;
  background: #111;
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 900;
}
</style>
