import { create } from 'zustand'

import { loadLogsFromStorage, saveLogsToStorage } from '../utils/storage'

// 로그 상태와 관련 함수들을 한 곳에서 관리하는 store
const useLogStore = create((set, get) => ({
  // 앱이 처음 실행될 때 LocalStorage에서 기존 로그를 불러온다.
  logs: loadLogsFromStorage(),

  // 새 로그 추가
  addLog: (newLog) => {
    const currentLogs = get().logs
    const updatedLogs = [newLog, ...currentLogs]

    set({ logs: updatedLogs })
    saveLogsToStorage(updatedLogs)
  },

  // 기존 로그 수정
  updateLog: (id, updatedLog) => {
    const currentLogs = get().logs

    // id가 같은 로그만 새 데이터로 교체한다.
    const updatedLogs = currentLogs.map((log) =>
      log.id === id
        ? {
            ...log,
            ...updatedLog,
            updatedAt: new Date().toISOString().slice(0, 10),
          }
        : log
    )

    set({ logs: updatedLogs })
    saveLogsToStorage(updatedLogs)
  },

  // id로 특정 로그 찾기
  getLogById: (id) => {
    return get().logs.find((log) => log.id === id)
  },

  // id가 일치하지 않는 로그만 남겨서 삭제 처리
  deleteLog: (id) => {
    const currentLogs = get().logs
    const updatedLogs = currentLogs.filter((log) => log.id !== id)

    set({ logs: updatedLogs })
    saveLogsToStorage(updatedLogs)
  },
}))

export default useLogStore