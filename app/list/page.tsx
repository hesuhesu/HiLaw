// app/list/page.tsx
import axios from 'axios';
import ListClient from './ListClient';

const API: string = process.env.NEXT_PUBLIC_API_LIST as string;

async function fetchLaws(query: string, page: number = 1) {
  try {
    const response = await axios.get(`${API}${query}&page=${page}`);
    const data = response.data;

    if (data.PrecSearch && data.PrecSearch.prec.length > 0) {
      const laws = data.PrecSearch.prec.map((item: any) => ({
        사건명: item['사건명'],
        사건번호: item['사건번호'],
        사건종류명: item['사건종류명'],
        선고: item['선고'],
        판례일련번호: item['판례일련번호'],
        판례유형: item['판례유형'],
        법원명: item['법원명'],
        선고일자: item['선고일자'],
      }));
      return { laws, totalCnt: data.PrecSearch.totalCnt };
    }
    return { laws: [], totalCnt: 0 };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { laws: [], totalCnt: 0 };
  }
}

export default async function ServerList() {
  // 초기 데이터 가져오기
  const { laws, totalCnt } = await fetchLaws('', 1);

  return (
    <div>
      <ListClient initialData={laws} totalCnt={totalCnt} />
    </div>
  );
}