import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Pencil, Sparkles, Trash2 } from 'lucide-react'

import useLogStore from '../store/useLogStore'
import { generateMockAiExplanation } from '../utils/mockAiExplanation'

const ErrorLogDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const log = useLogStore((state) =>
    state.logs.find((item) => item.id === id)
  )

  const deleteLog = useLogStore((state) => state.deleteLog)

  // 해당 id의 로그가 없을 때 보여주는 화면
  if (!log) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white">
          기록을 찾을 수 없습니다.
        </h1>

        <Link
          to="/logs"
          className="mt-4 inline-block text-sm text-violet-400 hover:text-violet-300"
        >
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  // 저장된 AI 설명이 있으면 그걸 사용하고,
  // 예전 데이터처럼 aiExplanation이 없으면 즉석에서 Mock 설명을 생성한다.
  const aiExplanation =
    log.aiExplanation || generateMockAiExplanation(log)

  const handleDelete = () => {
    const isConfirmed = window.confirm('정말 이 로그를 삭제할까요?')

    if (!isConfirmed) {
      return
    }

    deleteLog(id)
    navigate('/logs')
  }

  return (
    <div>
      <Link
        to="/logs"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to logs
      </Link>

      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              {log.createdAt}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              {log.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {log.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
              {log.difficulty}
            </span>

            <Link
              to={`/logs/${id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900"
            >
              <Pencil size={16} />
              Edit
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-semibold text-white">
          Error Message
        </h2>

        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-900 p-4 text-sm text-red-300">
          {log.errorMessage}
        </pre>
      </section>

      <section className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-semibold text-white">
            Situation
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {log.situation || '작성된 내용이 없습니다.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-semibold text-white">
            Cause
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {log.cause || '작성된 내용이 없습니다.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-semibold text-white">
            Solution
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {log.solution || '작성된 내용이 없습니다.'}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-violet-400" />

          <h2 className="text-lg font-semibold text-white">
            AI Beginner Explanation
          </h2>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-violet-400">
              쉽게 말하면
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {aiExplanation.summary}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-violet-400">
              원인 후보
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {aiExplanation.cause}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-violet-400">
              해결 힌트
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              {aiExplanation.solution}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ErrorLogDetail