<template>
  <div class="home">
    <div class="home-header">
      <h1>법률 판례 검색</h1>
      <input type="text" v-model="tempInputValue" placeholder="검색어를 입력하세요" />
      <button @click="submitValue">검색</button>
    </div>
    <div class="result" v-if="search">
      <h2>"{{ inputValue }}" 검색 결과 ({{ totalCnt }}개)</h2>
      <div v-if="Array.isArray(search)">
        <CaseItem
          v-for="(item, index) in search"
          :key="index"
          :item="item"
          @navigate="navigateToDetail"
        />
        <Pagination 
          :current-page="currentPage" 
          :total-pages="totalPages" 
          @page-changed="handlePageChange" />
      </div>
      <div v-else>
        <CaseItem :item="search" @navigate="navigateToDetail" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CaseItem from '../components/Home/CaseItem.vue';
import Pagination from '../components/Home/Pagination.vue';

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
const tempInputValue = ref('');
const search = ref<SearchData | SearchData[] | null>(null);
const totalCnt = ref<number>(0);
const currentPage = ref<number>(1);
const itemsPerPage = 20;
const router = useRouter();
const searchAPI = import.meta.env.VITE_LAW_SEARCH;

const totalPages = computed(() => Math.ceil(totalCnt.value / itemsPerPage));

const submitValue = async () => {
  inputValue.value = tempInputValue.value;
  currentPage.value = 1; // 검색 시 페이지를 초기화
  try {
    const response = await axios.post(`${searchAPI}${inputValue.value}`);
    if (Number(response.data.PrecSearch.totalCnt) === 0) {
      alert("검색 결과 없음!");
      search.value = null;
      totalCnt.value = 0;
      return;
    }
    search.value = response.data.PrecSearch.prec;
    totalCnt.value = response.data.PrecSearch.totalCnt;
  } catch (error) {
    console.error('API 요청 실패:', error);
    search.value = null;
  }
};

const pageChangeAPI = async () => {
  try {
    const response = await axios.post(`${searchAPI}${inputValue.value}&page=${currentPage.value}`);
    search.value = response.data.PrecSearch.prec;
    console.log(search.value);
  } catch (error) {
    console.error('API 요청 실패:', error);
    search.value = null;
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page;
  pageChangeAPI();
};

const navigateToDetail = (caseId: number) => {
  router.push({ name: 'LawDetail', params: { caseId } });
};
</script>

<style>
/* 스타일 그대로 유지 */
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