// 실수 태그별로 추천할 퀘스트 템플릿
export const questTemplates = [
  {
    id: 'react-useeffect',
    title: 'useEffect dependency 복습하기',
    description: 'useEffect의 dependency array가 언제 실행되는지 예제로 확인해보세요.',
    relatedTag: 'useEffect',
    xp: 30,
  },
  {
    id: 'react-state',
    title: 'State 변경 흐름 정리하기',
    description: 'setState 이후 화면이 다시 렌더링되는 흐름을 간단히 메모해보세요.',
    relatedTag: 'State',
    xp: 25,
  },
  {
    id: 'api-error',
    title: 'API 응답 구조 확인하기',
    description: 'console.log로 API 응답 데이터가 배열인지 객체인지 확인해보세요.',
    relatedTag: 'API',
    xp: 25,
  },
  {
    id: 'javascript-undefined',
    title: 'undefined 방어 코드 작성하기',
    description: 'optional chaining 또는 조건문으로 undefined 에러를 방지해보세요.',
    relatedTag: 'JavaScript',
    xp: 20,
  },
  {
    id: 'general-review',
    title: '최근 실수 하나 복습하기',
    description: '가장 최근에 기록한 에러의 원인과 해결 방법을 다시 읽어보세요.',
    relatedTag: 'General',
    xp: 15,
  },
]