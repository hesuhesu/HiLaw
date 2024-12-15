import Link from 'next/link';
import styles from './Home.module.css'; // 스타일 분리를 위해 CSS 모듈 사용

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>환영합니다!</h1>
      <div className={styles.buttonGroup}>
        <Link href="/list">
          <button className={styles.button}>판례 검색하기</button>
        </Link>
        <Link href="/terms">
          <button className={styles.button}>용어 배우기</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;