// 실제 AI API를 붙이기 전까지 사용하는 무료 Mock AI 설명 생성 함수
export const generateMockAiExplanation = (log) => {
  const message = log.errorMessage.toLowerCase()
  const tags = log.tags.map((tag) => tag.toLowerCase())

  if (message.includes('undefined')) {
    return {
      summary: '값이 아직 준비되지 않았는데 접근하려고 해서 생긴 에러일 가능성이 높아요.',
      cause: 'API 응답이 늦거나, 초기 state 값이 비어 있는 상태에서 속성에 접근했을 수 있어요.',
      solution: 'optional chaining, 조건부 렌더링, 기본값 설정을 확인해보세요.',
    }
  }

  if (message.includes('map') || tags.includes('api')) {
    return {
      summary: '배열이 아닌 값에 map을 사용했을 가능성이 있어요.',
      cause: 'API 응답 데이터가 배열이 아니라 객체이거나 undefined일 수 있어요.',
      solution: 'console.log로 데이터 구조를 확인하고, Array.isArray()로 배열 여부를 체크해보세요.',
    }
  }

  if (tags.includes('useeffect')) {
    return {
      summary: 'useEffect 실행 조건이 잘못되어 반복 실행되었을 가능성이 있어요.',
      cause: 'dependency array가 빠졌거나, effect 안에서 상태를 계속 변경했을 수 있어요.',
      solution: 'dependency array를 확인하고, 상태 변경이 무한 반복을 만들지 않는지 점검해보세요.',
    }
  }

  return {
    summary: '이 에러는 코드의 현재 값과 예상한 값이 달라서 발생했을 가능성이 있어요.',
    cause: '변수 값, 데이터 구조, 실행 순서를 확인해보는 것이 좋아요.',
    solution: 'console.log로 값을 확인하고, 작은 단위로 코드를 나눠서 원인을 찾아보세요.',
  }
}