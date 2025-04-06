# Next.js Weather App (리팩토링 버전)

Vue3로 개발했던 날씨 앱의 한계를 개선하기 위해 Next.js 기반으로 리팩토링한 프로젝트입니다.

### 🔗 배포 링크  
[https://next-weather-three-delta.vercel.app/](https://next-weather-three-delta.vercel.app/)

---

## 🛠️ 주요 개선 내용 및 설계 방식

### 1. 서버 상태 관리 개선
- React Query를 활용해 API 상태 관리 (Loading / Error / Success) 자동 처리
- 수동으로 처리했던 fetch, error, loading 상태 제거 → 코드 가독성 및 유지보수 향상

### 2. 데이터 캐싱 및 최적화
- 동일한 요청에 대해 캐싱 처리
- 불필요한 API 중복 요청 방지
- stale time, refetch option 등 추가 설정 가능

### 3. 컴포넌트 구조 개선
- Container, Navbar, SearchBar, WeatherCard 등 재사용 가능한 컴포넌트 설계
- Next.js App Router 구조 기반 페이지 설계

### 4. 추가적인 날씨 정보 제공
- 도시의 현재 날씨를 단순하게 제공하는 것을 넘어 현재 날씨를 각 시간마다 제공
- 일주일간의 도시의 날씨를 같이 제공함으로 유저에게 더 많은 정보를 제공

---

## ⚙️ 기술 스택

|구분|기술|
|---|---|
|Frontend|Next.js 14 (App Router), TypeScript|
|서버 상태 관리|React Query|
|API|OpenWeather API|
|스타일링|Tailwind CSS|
|Deployment|Vercel|

---

## ⚡ Vue3 → Next.js 리팩토링 핵심 개선 비교

|항목|Vue3 버전|Next.js 리팩토링 버전|
|---|---|---|
|서버 상태 관리|fetch 직접 처리 (loading, error 수동 처리)|React Query로 상태 자동 관리|
|데이터 캐싱|없음 (API 호출마다 새 요청)|자동 캐싱 지원 (불필요 요청 방지)|
|에러 처리|수동 alert 처리|React Query 에러 핸들링 내장|
|코드 구조|컴포넌트 위주 설계|컴포넌트 + 서버 상태 관리 구조 확립|

---

## 💡 리팩토링을 통해 배운 점
- 서버 상태 관리 라이브러리의 중요성 체감
- API 호출 방식과 데이터 최적화 전략 경험
- Vue → React / Next.js 생태계 이해
- 유지보수성과 사용자 경험을 동시에 고려한 설계 연습
