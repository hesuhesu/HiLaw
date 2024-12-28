<template>
  <div class="home">
    <div class="home-header">
      <h1>법률 판례 검색</h1>
      <input type="text" v-model="inputValue" placeholder="검색어를 입력하세요" />
      <button @click="submitValue">검색</button>
    </div>
    <div class="result" v-if="search">
      <h2>"{{inputValue}}" 검색 결과({{totalCnt}}개)</h2>
      <div v-if="Array.isArray(search)">
        <div v-for="(item, index) in search" :key="index" @click="navigateToDetail(item.판례일련번호)">
          <p><strong>사건명:</strong> {{ item.사건명 }}</p>
          <p><strong>사건번호:</strong> {{ item.사건번호 }}</p>
          <p><strong>사건종류:</strong> {{ item.사건종류명 }}</p>
          <p><strong>선고일자:</strong> {{ item.선고일자 }}</p>
          <p><strong>법원명:</strong> {{ item.법원명 }}</p>
          <p><strong>판결유형:</strong> {{ item.판결유형 }}</p>
          <p><strong>선고:</strong> {{ item.선고 }}</p>
          <p><strong>판례일련번호:</strong> {{ item.판례일련번호 }}</p>
          <hr/>
        </div>
      </div>
      <div v-else>
        <p @click="navigateToDetail(search.판례일련번호)">
          <strong>사건명:</strong> {{ search.사건명 }}<br />
          <strong>사건번호:</strong> {{ search.사건번호 }}<br />
          <strong>사건종류:</strong> {{ search.사건종류명 }}<br />
          <strong>선고일자:</strong> {{ search.선고일자 }}<br />
          <strong>법원명:</strong> {{ search.법원명 }}<br />
          <strong>판결유형:</strong> {{ search.판결유형 }}<br />
          <strong>선고:</strong> {{ search.선고 }}<br />
          <strong>판례일련번호:</strong> {{ search.판례일련번호 }}
        </p>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface SearchData {
  사건명: string;
  사건번호: string;
  사건종류명: string;
  선고: string;
  선고일자: string;
  판례일련번호: number;
  판결유형: string;
  법원명: string;
}

const inputValue = ref('');
const search = ref<SearchData | SearchData[] | null>(null);
const totalCnt = ref<number>(0);
const router = useRouter(); // 라우터 인스턴스 가져오기
const searchAPI = import.meta.env.VITE_LAW_SEARCH

const submitValue = async () => {
  try {
    const response = await axios.post(`${searchAPI}${inputValue.value}`);
    if (Number(response.data.PrecSearch.totalCnt) === 0){
      alert("검색 결과 없음!");
      search.value = null;
      totalCnt.value = 0;
      return;
    }
    search.value = response.data.PrecSearch.prec;
    totalCnt.value = response.data.PrecSearch.totalCnt;
  } catch (error) {
    console.error('API 요청 실패:', error);
    search.value = null; // 에러 발생 시 null로 설정
  }
};

// 판례를 클릭했을 때 호출되는 함수
const navigateToDetail = (caseId: number) => {
  router.push({ name: 'LawDetail', params: { caseId } }); // LawDetail 페이지로 네비게이션
};
</script>

<style>
/* 이전 스타일 그대로 유지 */
.home {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
  justify-items: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
}

.home-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 600px;
  width: 100%;
}

.home-header h1 {
  font-size: 50px;
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

.result {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  width: 70vw;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
}

.result h2 {
  font-size: 30px;
  text-align: center;
}

p {
  margin: 10px 0;
  font-size: 16px;
  color: #333;
}
</style>