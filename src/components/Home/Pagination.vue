<template>
    <div class="pagination">
      <!-- 제일 앞으로 가는 버튼 -->
    <button 
      :disabled="currentPage === 1" 
      @click="$emit('page-changed', 1)"
    >
      <<
    </button>
      <button 
        :disabled="currentPage === 1" 
        @click="$emit('page-changed', currentPage - 1)"
      >
        이전
      </button>
      <button 
        v-for="page in pagesToShow" 
        :key="page" 
        :class="{ active: page === currentPage }" 
        @click="$emit('page-changed', page)"
      >
        {{ page }}
      </button>
      <button 
        :disabled="currentPage === totalPages" 
        @click="$emit('page-changed', currentPage + 1)"
      >
        다음
      </button>
      <!-- 제일 뒤로 가는 버튼 -->
    <button 
      :disabled="currentPage === totalPages" 
      @click="$emit('page-changed', totalPages)"
    >
      >>
    </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface Props {
    currentPage: number;
    totalPages: number;
  }
  
  const props = defineProps<Props>();
  
  const pagesToShow = computed(() => {
    const range = 10;
    const start = Math.max(1, props.currentPage - Math.floor(range / 2));
    const end = Math.min(props.totalPages, start + range - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });
  </script>
  
  <style>
  .pagination {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 20px;
  }
  
  button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    cursor: pointer;
  }
  
  button.active {
    font-weight: bold;
    background: #007bff;
    color: white;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>
  