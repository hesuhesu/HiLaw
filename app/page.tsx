'use client'
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

// const API:string = process.env.API as string;
const API:string = process.env.NEXT_PUBLIC_API as string; // 환경변수에서 API URL 가져오기

interface Law {
  사건명: string;
  사건번호: string;
  사건종류명: string;
  선고일자: number;
  판례내용: string;
}

export default function Home() {
  const [api, setApi] = useState<Law | null>(null); // 초기값을 null로 설정

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(API);
        setApi(response.data.PrecService); // 데이터를 상태로 설정
      } catch (error) {
        console.error(error);
      } 
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatContent = (content: string) => { // <br/> 제거
    return content.split('<br/>').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };

  return (
    <div className={styles.page}>
      <span>
        {api && (
          <div>
            <h3>사건명: {api['사건명']}</h3>
            
            <p>사건번호: {api['사건번호']}</p>
            <p>사건종류명: {api['사건종류명']}</p>
            <p>선고일자: {api['선고일자']}</p>
            {/*<p>판례내용: {formatContent(api['판례내용'])}</p>*/}
          </div>
        )}
      </span>
    </div>
  );
}