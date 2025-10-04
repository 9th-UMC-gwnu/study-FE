### fetch
브라우저 / Node 내장 Promise 기반 HTTP API 표준 Web API

```
async function get_user(id: string) {
  const res = await fetch(`/api/users/${id}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    credentials: 'include', // 쿠키 필요 시
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<{ id: string; name: string }>;
}
```

#### 사용 이유
- 표준/내장: 추가 번들 크기 0.
- 스트리밍(ReadableStream) 등 표준 스트림 지원.
- Service Worker·Cache API 등 다른 Web API와 자연스럽게 결합.

#### 단점
- 에러 처리: 네트워크 오류만 reject. 4xx/5xx는 reject 안 함 → res.ok 수동 검사 필요.
- 타임아웃 없음: 직접 AbortController + setTimeout 구현.
- JSON 전송 시 headers['Content-Type']와 JSON.stringify 수동 지정 필요.

### axios
서드 파티 HTTP 클라이언트 라이브러리. 브라우저 / node 공용, 기능 확장(인터셉터, 기본설정 등)

```
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // 쿠키 필요 시
  timeout: 8000,
});

async function get_user(id: string) {
  const { data } = await api.get<{ id: string; name: string }>(`/users/${id}`);
  return data;
}
```

#### 사용 이유
- 인터셉터: 요청/응답 전후 공통 처리(토큰 주입, 에러 공통 변환).
- 기본 설정: baseURL, 헤더, timeout 등 중앙 관리.
- 자동 변환: 요청/응답 데이터 transform(예: JSON 직렬화/역직렬화 편의).
- 광범위 호환: 오래된 환경이나 fetch 미지원 환경에서도 쉽게 사용(단, 요즘은 Node 18+면 fetch 내장).

#### 단점
- 외부 의존성/번들 증가.
- 스트리밍은 브라우저에서 제한적(진짜 스트림 처리는 fetch가 유리).
- 인터셉터 남용 시 디버깅 복잡.


### 그래서 뭐쓰냐?
- 경량·표준·스트리밍이 중요 → fetch.
- 공통 헤더/토큰 주입, 에러/응답 표준화, 타임아웃·재시도 전략이 필요 → axios.