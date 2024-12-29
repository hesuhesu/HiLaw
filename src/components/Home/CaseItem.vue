<!-- CaseItem.vue -->
<template>
    <div @click="handleClick">
      <p><strong>사건명:</strong> {{ item.사건명 }}</p>
      <p><strong>사건번호:</strong> {{ item.사건번호 }}</p>
      <p><strong>사건종류:</strong> {{ item.사건종류명 }}</p>
      <p><strong>선고일자:</strong> {{ item.선고일자 }}</p>
      <p><strong>법원명:</strong> {{ item.법원명 }}</p>
      <p><strong>판결유형:</strong> {{ item.판결유형 }}</p>
      <p><strong>선고:</strong> {{ item.선고 }}</p>
      <p><strong>판례일련번호:</strong> {{ item.판례일련번호 }}</p>
      <hr />
    </div>
  </template>
  
  <script setup lang="ts">
  
  interface CaseItemProps {
    item: {
      사건명: string;
      사건번호: string;
      사건종류명: string;
      선고: string;
      선고일자: string;
      판례일련번호: number;
      판결유형: string;
      법원명: string;
    };
  }
  
  const props = defineProps<CaseItemProps>();
  const emit = defineEmits(['navigate']);
  
  const handleClick = () => {
    emit('navigate', props.item.판례일련번호);
  };
  </script>
  
  <style scoped>
  div {
    cursor: pointer;
  }
  div:hover {
    background-color: #f0f8ff;
  }
  </style>