import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import ErrorLogCard from '../components/logs/ErrorLogCard'
import useLogStore from '../store/useLogStore'
import EmptyState from '../components/common/EmptyState'

const difficultyFilters = ['all', 'easy', 'normal', 'hard']

const ErrorLogs = () => {
  const logs = useLogStore((state) => state.logs)

  // 검색창 입력값 관리
  const [searchKeyword, setSearchKeyword] = useState('')

  // 현재 선택된 난이도 필터
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const filteredLogs = logs.filter((log) => {
    const keyword = searchKeyword.toLowerCase()

    // 검색어가 제목, 에러 메시지, 태그에 포함되는지 확인
    const matchesKeyword =
      log.title.toLowerCase().includes(keyword) ||
      log.errorMessage.toLowerCase().includes(keyword) ||
      log.tags.some((tag) => tag.toLowerCase().includes(keyword))

    // all이면 전체 표시, 아니면 선택한 난이도와 같은 로그만 표시
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      log.difficulty === selectedDifficulty

    return matchesKeyword && matchesDifficulty
  })

  return (
    <div>
      <section className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Error Logs
          </h1>

          <p className="mt-2 text-slate-400">
            반복되는 실수를 기록하고 다시 확인해보세요.
          </p>
        </div>

        <Link
          to="/logs/new"
          className="flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
        >
          <Plus size={18} />
          New Log
        </Link>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="Search by title, error message, or tag..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
        />

        {/* 난이도 필터 버튼 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {difficultyFilters.map((difficulty) => (
            <button
              key={difficulty}
              type="button"
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedDifficulty === difficulty
                  ? 'bg-violet-500 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <ErrorLogCard key={log.id} log={log} />
          ))
        ) : (
          <EmptyState
            title="검색 결과가 없습니다."
            description="다른 키워드나 난이도를 선택해보세요."
          />
        )}
      </section>
    </div>
  )
}

export default ErrorLogs