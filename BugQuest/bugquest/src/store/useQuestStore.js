import { create } from 'zustand'

import {
  loadQuestStateFromStorage,
  saveQuestStateToStorage,
} from '../utils/storage'

const initialQuestState = loadQuestStateFromStorage()

// 퀘스트 완료 상태와 XP/레벨을 관리하는 store
const useQuestStore = create((set, get) => ({
  completedQuestIds: initialQuestState.completedQuestIds,
  xp: initialQuestState.xp,
  level: initialQuestState.level,

  completeQuest: (quest) => {
    const { completedQuestIds, xp } = get()

    // 이미 완료한 퀘스트면 중복 XP 지급 방지
    if (completedQuestIds.includes(quest.id)) {
      return
    }

    const nextQuestState = {
      completedQuestIds: [...completedQuestIds, quest.id],
      xp: xp + quest.xp,
      level: Math.floor((xp + quest.xp) / 100) + 1,
    }

    set(nextQuestState)

    // 새로고침 후에도 유지되도록 LocalStorage에 저장
    saveQuestStateToStorage(nextQuestState)
  },
}))

export default useQuestStore