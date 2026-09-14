# SPC 연도별 대회 기록 — `year` 쿼리스트링

- 대상: `/spc` — `src/app/spc-page/spc-page.tsx`
- 상태: 구현 완료

## 동작

| 상황 | 결과 |
|---|---|
| `/spc` 접속 | 기본 연도(`initialValue.year`, 현재 2025) 선택, URL 그대로 |
| `/spc?year=2023` 접속 | 2023 선택 |
| 드롭다운에서 연도 변경 | `?year=<연도>`로 URL 갱신 (`replace`, 히스토리 누적 없음, 스크롤 유지) |
| `/spc?year=1999`, `/spc?year=abc` 등 데이터에 없는 값 | 기본 연도 선택 + URL에서 `year` 제거 (`replace`) |
| 다른 쿼리(`utm_*` 등)와 함께 접속 | `year`만 갱신·제거하고 나머지 쿼리는 보존 |

- 쿼리 키: `year` (`SPC_YEAR_SEARCH_PARAM_KEY`)
- 연도 값은 `spc-data/all.ts`의 `year`와 문자열로 정확히 일치해야 유효 (`2023`만 허용, `02023` 불가)
- GitHub Pages SPA 리다이렉트(`public/404.html` → `public/index.html`)가 쿼리스트링을 보존하므로 딥링크 첫 진입도 동작

## 구현

- `src/app/spc-page/contexts/selected-spc-history-context.tsx`
  - 선택 연도를 `useState`가 아니라 `useSearchParams`에서 파생. URL이 단일 소스
  - `setYear`는 `React.Dispatch<React.SetStateAction<number>>` 시그니처 유지 → `YearSelectorDropdown` 변경 없음
  - 무효한 `year`는 effect에서 `replace`로 제거
  - `createContext(null as any)` 제거, Provider 밖 사용 시 에러
- `src/routes/scroll-top-on-route-change.tsx`
  - 기존: `location` 변경마다 스크롤 최상단 → 쿼리만 바뀌어도 맨 위로 튐
  - 변경: `REPLACE` 네비게이션은 스크롤 유지. `PUSH`/`POP`(링크 이동, 뒤로가기, 첫 진입)은 기존대로 최상단
- `src/app/spc-page/spc-page.tsx`
  - `spcData.years.reverse()`가 컨텍스트의 공유 배열을 렌더마다 제자리에서 뒤집는 부수효과를 `[...years].reverse()`로 제거. 렌더 횟수에 따라 드롭다운 순서가 뒤바뀔 수 있는 잠재 버그

## 참고

- `/history` 페이지(`selected-history-context.tsx`, `history-page.tsx`)는 같은 구조지만 이번 작업 범위 밖이라 쿼리스트링 미적용, `years.reverse()` 제자리 변경도 그대로 남아 있음
