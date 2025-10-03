import { useEffect, useState, type JSX } from "react";

// 페이지 컴포넌트
function Home(): JSX.Element {
  return <h1>🏠 Home Page</h1>;
}

function About(): JSX.Element {
  return <h1>ℹ️ About Page</h1>;
}

function Contact(): JSX.Element {
  return <h1>📞 Contact Page</h1>;
}

// 라우트 테이블 타입
const routes: Record<string, JSX.Element> = {
  "/week3/study1": <Home />,
  "/week3/study1/about": <About />,
  "/week3/study1/contact": <Contact />,
};

function Study1Page(): JSX.Element {
  const [path, setPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // 네비게이션 함수 타입 지정
  const navigate = (to: string): void => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/week3/study1");
          }}
        >
          Home
        </a>{" "}
        |{" "}
        <a
          href="/about"
          onClick={(e) => {
            e.preventDefault();
            navigate("/week3/study1/about");
          }}
        >
          About
        </a>{" "}
        |{" "}
        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            navigate("/week3/study1/contact");
          }}
        >
          Contact
        </a>
      </nav>

      <main>{routes[path] ?? <h1>404 Not Found</h1>}</main>
    </div>
  );
}

export default Study1Page;
