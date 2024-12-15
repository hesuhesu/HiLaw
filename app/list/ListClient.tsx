'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Law {
  사건명: string;
  사건번호: string;
  사건종류명: string;
  선고: string;
  판례일련번호: number;
  판례유형: string;
  법원명: string;
  선고일자: string;
}

interface ListClientProps {
  initialData: Law[];
  totalCnt: number;
}

const API: string = process.env.NEXT_PUBLIC_API_LIST as string;

export default function ListClient({ initialData, totalCnt }: ListClientProps) {
  const [api, setApi] = useState<Law[]>(initialData);
  const [string, setString] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(totalCnt / 20)
  );
  const router = useRouter();

  const handleFindData = async () => {
    try {
      const response = await axios.get(`${API}${string}`);
      const data = response.data;
      const totalCnt = Number(data.PrecSearch.totalCnt);
      if (data.PrecSearch && totalCnt > 0) {
        if (totalCnt === 1){
            // totalCnt가 1일 경우
            const item = data.PrecSearch.prec;
            const law: Law = {
            사건명: item['사건명'],
            사건번호: item['사건번호'],
            사건종류명: item['사건종류명'],
            선고: item['선고'],
            판례일련번호: item['판례일련번호'],
            판례유형: item['판례유형'],
            법원명: item['법원명'],
            선고일자: item['선고일자'],
            };
            setApi([law]); // 배열 형태로 설정
            }
        else {
            const laws: Law[] = data.PrecSearch.prec.map((item: any) => ({
                사건명: item['사건명'],
                사건번호: item['사건번호'],
                사건종류명: item['사건종류명'],
                선고: item['선고'],
                판례일련번호: item['판례일련번호'],
                판례유형: item['판례유형'],
                법원명: item['법원명'],
                선고일자: item['선고일자'],
              }));
            setApi(laws);
        }
        setPage(1);
        setTotalPages(Math.ceil(totalCnt / 20));
      } else {
        setApi([]);
        setPage(1);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = async (newPage: number) => {
    try {
      const response = await axios.get(`${API}${string}&page=${newPage}`);
      const data = response.data;
      const totalCnt = Number(data.PrecSearch.totalCnt);
      if (data.PrecSearch && totalCnt > 0) {
        if (totalCnt === 1){
            // totalCnt가 1일 경우
            const item = data.PrecSearch.prec;
            const law: Law = {
            사건명: item['사건명'],
            사건번호: item['사건번호'],
            사건종류명: item['사건종류명'],
            선고: item['선고'],
            판례일련번호: item['판례일련번호'],
            판례유형: item['판례유형'],
            법원명: item['법원명'],
            선고일자: item['선고일자'],
            };
            setApi([law]); // 배열 형태로 설정
            }
        else {
            const laws: Law[] = data.PrecSearch.prec.map((item: any) => ({
                사건명: item['사건명'],
                사건번호: item['사건번호'],
                사건종류명: item['사건종류명'],
                선고: item['선고'],
                판례일련번호: item['판례일련번호'],
                판례유형: item['판례유형'],
                법원명: item['법원명'],
                선고일자: item['선고일자'],
              }));
            setApi(laws);
        }
        setPage(newPage);
      } else {
        setApi([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLawClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <div>
      <label>판례 조회하기(판례명): </label>
      <input onChange={(e) => setString(e.target.value)} />
      <button type="button" onClick={handleFindData}>
        확인
      </button>
      <button>
        <Link href="/">홈으로</Link>
      </button>

      <br />

      {api.length > 0 ? (
        api.map((law, index) => (
          <div
            key={index}
            onClick={() => handleLawClick(law.판례일련번호)}
            style={{
              border: '1px solid #ccc',
              margin: '10px 0',
              padding: '10px',
            }}
          >
            <h3>사건명: {law.사건명}</h3>
            <p>사건번호: {law.사건번호}</p>
            <p>사건종류명: {law.사건종류명}</p>
            <p>선고: {law.선고}</p>
            <p>판례일련번호: {law.판례일련번호}</p>
            <p>법원명: {law.법원명}</p>
            <p>선고일자: {law.선고일자}</p>
          </div>
        ))
      ) : (
        <h3>데이터 없음</h3>
      )}

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: '0 5px' }}
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}