import Link from 'next/link';

const Home: React.FC = () => {

  return (
    <div style={{ padding: '20px' }}>
      <button><Link href="/list">판례 검색하기</Link></button>
      <button><Link href="/list">용어 검색하기</Link></button>
    </div>
  );
}

export default Home;