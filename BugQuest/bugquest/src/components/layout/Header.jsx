import { useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'

import useQuestStore from '../../store/useQuestStore'

const pageTitles = {
  '/': {
    title: 'Dashboard',
    description: '오늘도 하나씩 성장해봐요',
  },
  '/logs': {
    title: 'Error Logs',
    description: '반복되는 실수를 기록하고 다시 확인해보세요',
  },
  '/logs/new': {
    title: 'New Error Log',
    description: '오늘 만난 에러를 기록해보세요',
  },
  '/quests': {
    title: 'Daily Quests',
    description: '실수를 성장 퀘스트로 바꿔보세요',
  },
  '/stats': {
    title: 'Stats',
    description: '반복되는 실수를 데이터로 확인해보세요',
  },
  '/settings': {
    title: 'Settings',
    description: '앱 데이터를 관리합니다',
  },
}

const Header = ({ onOpenSidebar }) => {
  const location = useLocation()
  const xp = useQuestStore((state) => state.xp)
  const level = useQuestStore((state) => state.level)

// 상세 페이지 / 수정 페이지처럼 id가 들어가는 동적 경로 처리
let currentPage = pageTitles[location.pathname]

if (location.pathname.startsWith('/logs/') && location.pathname.endsWith('/edit')) {
  currentPage = {
    title: 'Edit Error Log',
    description: '기록한 실수를 다시 정리해보세요',
  }
} else if (location.pathname.startsWith('/logs/')) {
  currentPage = {
    title: 'Error Detail',
    description: '실수의 원인과 해결 과정을 복습해보세요',
  }
}

if (!currentPage) {
  currentPage = {
    title: 'BugQuest',
    description: 'Debug. Learn. Level up.',
  }
}

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* 모바일에서 사이드바를 여는 버튼 */}
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-lg border border-slate-700 p-2 text-slate-300 md:hidden"
        >
          <Menu size={18} />
        </button>

        <div>
          <p className="text-xs text-slate-500 md:text-sm">
            {currentPage.title}
          </p>

          <h2 className="text-sm font-semibold text-white md:text-lg">
            {currentPage.description}
          </h2>
        </div>
      </div>

      <div className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300 md:px-4 md:text-sm">
        Lv. {level} · {xp} XP
      </div>
    </header>
  )
}

export default Header