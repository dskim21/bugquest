# 🐞 BugQuest

> 반복되는 개발 실수를 기록하고, 성장 퀘스트로 복습하는 디버깅 학습 웹앱

초보 개발자가 반복적으로 겪는 에러를 단순 기록하는 데서 끝나지 않고,  
실수를 **학습 데이터로 전환하여 성장 루프를 만드는 것**을 목표로 만든 프로젝트입니다.

기록한 태그를 기반으로 퀘스트를 추천하고,  
XP 시스템을 통해 학습 동기를 제공합니다.

🔗 **Live Demo**  
https://bugquest.vercel.app

---

## 📌 프로젝트 개요

### Why?

개발 공부를 하면서 같은 에러를 반복해서 겪는 경우가 많았습니다.

기존 메모 방식은 다시 보지 않게 되었고,  
실수를 **복습 가능한 구조**로 관리하면 학습 효율이 높아질 것이라 생각했습니다.

### Solution

단순 기록 앱이 아니라:

```txt
실수 기록
→ 패턴 분석
→ 퀘스트 추천
→ 성장 보상(XP)
```

으로 이어지는 **성장 루프 기반 학습 시스템**을 설계했습니다.

---

## ✨ 핵심 기능

### 📝 Error Log CRUD

- 에러 로그 생성 / 조회 / 수정 / 삭제
- 반복 실수 기록 및 복습

### 🔍 검색 & 필터

- 태그 기반 검색
- 난이도 필터링
- 반복 패턴 탐색

### 🤖 Mock AI Explanation

초보 개발자가 이해하기 쉬운 형태로:

- 쉽게 말하면
- 원인 후보
- 해결 힌트

구조의 설명 제공

> 실제 AI API 비용 없이 MVP 검증을 위해 Mock 로직으로 구현

### 🎯 Quest Recommendation

기록된 태그를 분석해 관련 퀘스트 추천

예:

```txt
React → 상태관리 퀘스트
API → 응답 구조 점검 퀘스트
```

### 🧩 XP / Level System

퀘스트 완료 시 XP 증가

```txt
Lv.1 → Lv.2
```

형태의 성장 요소 구현

### 📊 Statistics Dashboard

반복되는 실수 데이터를 시각화

- 태그 빈도
- 난이도 분포
- 최근 기록

### 📱 Responsive UI

모바일 Sidebar Menu 및 반응형 UI 구현

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### State Management

- Zustand

### Routing

- React Router

### Visualization

- Recharts

### Storage

- LocalStorage

### Deployment

- Vercel
- GitHub

### UI

- lucide-react

---

## 🏗 Architecture

```txt
User Action
    ↓
Zustand State
    ↓
LocalStorage Persistence
    ↓
Dashboard / Stats / Quest Recommendation
```

---

## 🚀 MVP 특징

- 백엔드 없이 무료 환경에서 동작
- API 비용 없이 Mock AI 로직 구현
- Vercel 무료 배포
- 1~2주 MVP 범위 설계
- 추후 실제 AI API 연결 가능한 구조 설계

---

## 🧠 Technical Decisions

### 왜 Zustand를 사용했는가?

Redux 대비 보일러플레이트가 적고,  
작은 규모 프로젝트에서 빠르게 전역 상태를 관리하기 적합하다고 판단했습니다.

---

### 왜 LocalStorage를 선택했는가?

무료 MVP 범위를 고려하여  
백엔드 없이도 사용자 경험을 제공하기 위해 선택했습니다.

추후 Supabase/Firebase 등으로 확장 가능하도록 구조를 설계했습니다.

---

### 왜 Mock AI를 구현했는가?

실제 OpenAI API 비용 없이도  
기능 흐름과 UX를 먼저 검증하기 위해 함수 기반 Mock 구조를 구현했습니다.

추후:

```js
generateMockAiExplanation()
```

부분만 실제 API로 교체 가능하도록 분리했습니다.

---

## 🔥 Troubleshooting

### 1. Windows 환경에서 Git 대소문자 변경 미감지 문제

#### 문제

Vercel 배포 시 컴포넌트 import 에러 발생

#### 원인

Windows 환경에서는 Git이 파일명 대소문자 변경을 제대로 추적하지 못함

로컬에서는 정상 동작했지만 Linux 기반 Vercel 환경에서 빌드 실패

#### 해결

```bash
git mv
```

를 활용하여 Git index 강제 갱신

#### 배운 점

Windows / Linux 환경 차이에 따른 배포 이슈 이해

---

### 2. `.gitignore` 설정 충돌 문제

#### 문제

```txt
src/components/logs
```

폴더가 GitHub에 업로드되지 않음

#### 원인

`.gitignore`의:

```txt
logs
```

규칙이 하위 폴더에도 적용됨

#### 해결

```txt
logs → /logs/
```

로 수정하여 루트 logs 폴더만 무시하도록 변경

#### 배운 점

Git ignore scope 동작 방식 이해

---

### 3. SPA Routing 문제

#### 문제

```txt
/quests
```

직접 접근 시 페이지 오류 발생

#### 원인

React Router 기반 SPA 라우팅 특성

#### 해결

Vercel rewrite 설정 적용 예정

---

## 📦 Project Setup

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## 🌱 Future Improvements

- OpenAI API 연동
- 로그인 기능
- Supabase 연동
- 주간 성장 리포트
- GitHub 연동
- 학습 통계 고도화

---

## 👩‍💻 Author

**Dasom Kim**

GitHub: https://github.com/dskim21
npm run dev

## 배포 링크

https://bugquest.vercel.app/