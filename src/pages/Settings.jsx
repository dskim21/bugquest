import { useNavigate } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'

import { clearAllStorage } from '../utils/storage'

const Settings = () => {
  const navigate = useNavigate()

  const handleResetData = () => {
  const isConfirmed = window.confirm(
    '모든 로그, 퀘스트, XP 데이터를 초기화할까요?'
  )

  if (!isConfirmed) {
    return
  }

  clearAllStorage()
  window.location.href = '/'
}

  return (
    <div>
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          BugQuest 앱 데이터를 관리합니다.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold text-white">
          Data Management
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          테스트 중 쌓인 로그, 완료한 퀘스트, XP 데이터를 한 번에 초기화할 수 있습니다.
        </p>

        <button
          type="button"
          onClick={handleResetData}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          <RotateCcw size={16} />
          Reset All Data
        </button>
      </section>
    </div>
  )
}

export default Settings