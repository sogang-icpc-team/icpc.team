# 기록(History) 연도별 대회 기록 — `year` 쿼리스트링

- 대상: `/history` — `src/app/history-page/history-page.tsx`
- 상태: 구현 완료
- 선행 작업: `/spc` 동일 기능 ([spc-year-querystring.md](./spc-year-querystring.md), PR #87)

## 동작

| 상황 | 결과 |
|---|---|
| `/history` 접속 | 기본 연도(`initialValue.year`, 현재 2025) 선택, URL 그대로 |
| `/history?year=2022` 접속 | 2022 선택 |
| 드롭다운에서 연도 변경 | `?year=<연도>`로 URL 갱신 (`replace`, 히스토리 누적 없음, 스크롤 유지) |
| `/history?year=1999`, `?year=abc`, `?year=02022`, `?year=` 등 데이터에 없는 값 | 기본 연도 선택 + URL에서 `year` 제거 (`replace`) |
| 다른 쿼리(`utm_*` 등)와 함께 접속 | `year`만 갱신·제거하고 나머지 쿼리는 보존 |
| 다른 페이지로 이동(PUSH) 후 뒤로가기 | URL의 `year`로 선택 연도 복원 |

- 쿼리 키: `year` (`HISTORY_YEAR_SEARCH_PARAM_KEY`)
- 연도 값은 `history-data/all.ts`의 `year`와 문자열로 정확히 일치해야 유효 (2005~2025)
- GitHub Pages SPA 리다이렉트(`public/404.html` → `public/index.html`)가 쿼리스트링을 보존하므로 딥링크 첫 진입도 동작

## 구현

- `src/app/history-page/contexts/selected-history-context.tsx`
  - 선택 연도를 `useState`가 아니라 `useSearchParams`에서 파생. URL이 단일 소스
  - 기존 `data` 상태 + `useEffect` 동기화(및 `eslint-disable`) 제거, 렌더 시 `year`로 바로 조회
  - `setYear`는 `React.Dispatch<React.SetStateAction<number>>` 시그니처 유지 → `YearSelectorDropdown`, `HistoryTab`, `HistoryDisplay` 변경 없음
  - 무효한 `year`는 effect에서 `replace`로 제거
  - `createContext(null as any)` 제거, Provider 밖 사용 시 에러
- `src/app/history-page/history-page.tsx`
  - `historyData.years.reverse()`가 `HistoryDataContext`의 공유 배열을 렌더마다 제자리에서 뒤집던 부수효과를 `[...years].reverse()`로 제거. 렌더 횟수에 따라 드롭다운 순서가 뒤바뀔 수 있던 잠재 버그
- 스크롤 유지는 PR #87의 `src/routes/scroll-top-on-route-change.tsx`(`REPLACE` 네비게이션 시 스크롤 유지)에 의존. 이번 작업에서 추가 변경 없음

## 검증 (로컬 dev 서버, 8085)

- `/history?year=2022` 진입 시 드롭다운 2022, 본문 `2022 ICPC Asia Seoul Regional Contest`부터 표시
- 드롭다운 2022 → 2019 → 2016 변경 시 URL 갱신, `history.length` 유지, `scrollY` 유지(500 → 500)
- 드롭다운 여러 번 열고 닫아도 순서 `2025, 2024, …, 2005` 고정
- `?year=1999&utm_source=kakao` → 2025 + `?utm_source=kakao`, `?year=abc` / `?year=` → 2025 + `/history`, `?year=02022&ref=x` → 2025 + `?ref=x`
- `?utm_source=kakao&year=2021`에서 2018로 변경 → `?utm_source=kakao&year=2018`
- 내비게이션 링크 이동(PUSH) 시 `scrollY` 0, 뒤로가기 시 `?utm_source=kakao&year=2018`과 2018 선택 복원
- `npx tsc --noEmit`, `yarn lint` 통과
