<template>
  <div>
    <h1>Home 페이지</h1>
    <input type="text" v-model="inputValue" placeholder="값을 입력하세요">
    <button @click="submitValue">제출</button>

    <div v-if="result">
      <h2>결과:</h2>
      <p>판례정보일련번호: {{ result.판례정보일련번호 }}</p>
      <p>사건명: {{ result.사건명 }}</p>
      <p>선고 일자: {{ result.선고일자 }}</p>
      <p>판례 내용: {{ result.판례내용}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

interface Data {
  판례정보일련번호: string,
  사건명: string,
  선고일자: number,
  판례내용: string
}

const inputValue = ref(''); // 입력 값을 저장할 ref
const result = ref<Data | null>(null); // API 응답 결과를 저장할 ref
const apiKey = import.meta.env.VITE_LAW_LINK;

const submitValue = async () => {
  try {
    const response = await axios.post(`${apiKey}${inputValue.value}`);

    // 응답 데이터를 result에 저장
    result.value = {
      판례정보일련번호: response.data.PrecService.판례정보일련번호,
      사건명: response.data.PrecService.사건명,
      선고일자: response.data.PrecService.선고일자,
      판례내용: response.data.PrecService.판례내용
    };
  } catch (error) {
    console.error('API 요청 실패:', error); // 에러 처리
  }
};
</script>

<style>
/* 스타일이 필요하면 여기에 추가 */
</style>