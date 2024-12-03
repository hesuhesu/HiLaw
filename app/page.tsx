'use client'
import { useState } from 'react';
import axios from 'axios';
import './styles.css'; // 스타일 파일을 임포트하세요.

const API_STRING: string = process.env.NEXT_PUBLIC_API_STRING as string;

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

export default function Home() {
  const [api, setApi] = useState<Law[]>([]);
  const [string, setString] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); // 전체 페이지 수

  const handleFindData = async () => {
    try {
      const response = await axios.get(`${API_STRING}${string}`);
      const data = response.data;

      if (data.PrecSearch && data.PrecSearch.prec.length > 0) {
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
        setPage(1);
        setTotalPages(Math.ceil(data.PrecSearch.totalCnt / 20)); // 전체 페이지 수 업데이트
      } else {
        setApi([]);
      }
    } catch (error) {
      console.log("error");
    }
  }

  const handlePageChange = async (newPage: number) => {
    try {
      const response = await axios.get(`${API_STRING}${string}&page=${newPage}`);
      const data = response.data;

      if (data.PrecSearch && data.PrecSearch.prec.length > 0) {
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
        setPage(newPage);
      } else {
        setApi([]);
      }
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <div className="container">
      <label>판례 조회하기(판례명) : </label>
      <input onChange={(e) => { setString(e.target.value); }}></input>
      <button type="button" onClick={handleFindData}>확인</button>
      <br/>

      {api.length > 0 ? 
        api.map((law, index) => (
          <div key={index} className="law-card">
            <h3>사건명: {law.사건명}</h3>
            <p>사건번호: {law.사건번호}</p>
            <p>사건종류명: {law.사건종류명}</p>
            <p>선고: {law.선고}</p>
            <p>판례일련번호: {law.판례일련번호}</p>
            <p>법원명: {law.법원명}</p>
            <p>선고일자: {law.선고일자}</p>
          </div>
        )) : 
        <div>
          <h3>데이터 없음</h3>
        </div>
      }

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} 
            onClick={() => handlePageChange(index + 1)} 
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <label>현재 페이지 : {page}</label>
    </div>
  );
}