// 실제 DB 연결 전까지 화면 확인용으로 사용하는 임시 데이터
export const mockLogs = [
  {
    id: '1',
    title: 'map is not a function',
    errorMessage: 'TypeError: data.map is not a function',
    tags: ['React', 'API'],
    difficulty: 'normal',
    createdAt: '2026-05-20',
  },
  {
    id: '2',
    title: 'Cannot read properties of undefined',
    errorMessage: "Cannot read properties of undefined (reading 'name')",
    tags: ['JavaScript', 'State'],
    difficulty: 'easy',
    createdAt: '2026-05-19',
  },
  {
    id: '3',
    title: 'useEffect 무한 반복',
    errorMessage: 'Maximum update depth exceeded',
    tags: ['React', 'useEffect'],
    difficulty: 'hard',
    createdAt: '2026-05-18',
  },
]