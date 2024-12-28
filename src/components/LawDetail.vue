<template>
  <div class="home">
    <div v-if="result" class="result">
      <h2>판례 결과</h2>
      <p>판례정보일련번호: {{ result.판례정보일련번호 }}</p>
      <p>사건명: {{ result.사건명 }}</p>
      <p>선고 일자: {{ result.선고일자 }}</p>
      <p v-html="result.판례내용"/>

      <button @click="backRouter">뒤로가기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

interface Data {
  판례정보일련번호: string,
  사건명: string,
  선고일자: number,
  판례내용: string
}

const inputValue = ref(''); // 입력 값을 저장할 ref
const result = ref<Data | null>(null);
const dataKey = import.meta.env.VITE_LAW_LINK;
const router = useRouter(); // 라우터 인스턴스 가져오기

const props = defineProps<{
  caseId: number;
}>();

const resultResult = async () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  try {
    const response = await axios.post(`${dataKey}${props.caseId}`);

    // 응답 데이터를 result에 저장
    result.value = {
      판례정보일련번호: response.data.PrecService.판례정보일련번호,
      사건명: response.data.PrecService.사건명,
      선고일자: response.data.PrecService.선고일자,
      판례내용: response.data.PrecService.판례내용
    };
  } catch (error) {
    console.error('API 요청 실패:', error); // 에러 처리
    result.value = {
      판례정보일련번호: null,
      사건명: null,
      선고일자: null,
      판례내용: null
    };
  }
};

const backRouter = () => {
    router.go(-1)
}

resultResult();

</script>

<style>
.home {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
  justify-items: center;
  align-items: center;
  background-color: #f9f9f9; /* 배경색 */
  padding: 20px;
}

.home-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px; /* 간격 */
  max-width: 600px; /* 최대 너비 */
  width: 100%; /* 전체 너비 */
}

.home-header h1 {
  font-size: 50px;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 16px; /* 글자 크기 */
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px; /* 둥근 모서리 */
  background-color: #007bff; /* 버튼 색상 */
  color: white; /* 글자 색상 */
  cursor: pointer; /* 커서 변경 */
  font-size: 16px; /* 글자 크기 */
}

button:hover {
  background-color: #0056b3; /* 호버 효과 */
}

.result {
  display: grid;
  grid-template-columns: 1fr; /* 한 열로 표시 */
  gap: 15px; /* 간격 */
  width: 70vw; /* 전체 너비 */
  margin-top: 20px; /* 상단 여백 */
  padding: 20px;
  background-color: #fff; /* 결과 배경색 */
  border: 1px solid #ddd; /* 테두리 */
  border-radius: 5px; /* 둥근 모서리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  overflow-wrap: break-word; /* 긴 단어를 줄바꿈 */
}

.result h2 {
  font-size: 30px;
  text-align: center;
}

p {
  margin: 10px 0; /* 문단 간격 */
  font-size: 16px; /* 글자 크기 */
  color: #333; /* 글자 색상 */
}
</style>