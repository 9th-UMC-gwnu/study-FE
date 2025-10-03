import { Link, Route, Routes } from './Route';

const MatthewPage = () => <h1>매튜 페이지</h1>;
const AeongPage = () => <h1>애옹 페이지</h1>;
const JoyPage = () => <h1>조이 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to='/matthew'>MATTHEW</Link>
      <Link to='/aeong'>AEONG</Link>
      <Link to='/joy'>JOY</Link>
      <Link to='/not-found'>NOT FOUND</Link>
    </nav>
  );
};

function HistoryAPI() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/matthew' component={MatthewPage} />
        <Route path='/aeong' component={AeongPage} />
        <Route path='/joy' component={JoyPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default HistoryAPI;

/* 
    라우터의 본질

    1. URL 경로에 따라 다른 컴포넌트를 렌더링
    2. 경로를 통한 페이지 이동
    3. 경로를 state로 관리하기
    4. Route로 라우팅 테이블을 정의하고, Router가 매칭되는 경로를 찾아 렌더링 하도록 만들기
    
*/