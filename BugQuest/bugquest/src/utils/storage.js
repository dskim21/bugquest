// LocalStorage에 저장할 key 이름을 상수로 관리
const LOGS_STORAGE_KEY = 'bugquest-error-logs'
const QUEST_STORAGE_KEY = 'bugquest-quest-state'

// LocalStorage에서 로그 목록을 불러오는 함수
export const loadLogsFromStorage = () => {
  const savedLogs = localStorage.getItem(LOGS_STORAGE_KEY)

  if (!savedLogs) {
    return []
  }

  try {
    return JSON.parse(savedLogs)
  } catch (error) {
    console.error('Failed to parse logs from localStorage:', error)
    return []
  }
}

// LocalStorage에 로그 목록을 저장하는 함수
export const saveLogsToStorage = (logs) => {
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs))
}

// LocalStorage에서 퀘스트 상태를 불러오는 함수
export const loadQuestStateFromStorage = () => {
  const savedQuestState = localStorage.getItem(QUEST_STORAGE_KEY)

  // 저장된 퀘스트 상태가 없으면 기본값 반환
  if (!savedQuestState) {
    return {
      completedQuestIds: [],
      xp: 0,
      level: 1,
    }
  }

  try {
    return JSON.parse(savedQuestState)
  } catch (error) {
    console.error('Failed to parse quest state from localStorage:', error)

    return {
      completedQuestIds: [],
      xp: 0,
      level: 1,
    }
  }
}

// LocalStorage에 퀘스트 상태를 저장하는 함수
export const saveQuestStateToStorage = (questState) => {
  localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(questState))
}

// BugQuest에서 사용하는 LocalStorage 데이터를 모두 삭제한다.
export const clearAllStorage = () => {
  localStorage.removeItem('bugquest-error-logs')
  localStorage.removeItem('bugquest-quest-state')
}