import { Link } from 'react-router-dom'

// 난이도별 색상을 구분하기 위한 객체
const difficultyStyles = {
  easy: 'bg-emerald-500/10 text-emerald-400',
  normal: 'bg-yellow-500/10 text-yellow-400',
  hard: 'bg-red-500/10 text-red-400',
}

const ErrorLogCard = ({ log }) => {
  return (
    <Link
      to={`/logs/${log.id}`}
      className="block rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-violet-500/60 hover:bg-slate-900"
    >
      {/* 제목 + 난이도 */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {log.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-400">
            {log.errorMessage}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyStyles[log.difficulty]}`}
        >
          {log.difficulty}
        </span>
      </div>

      {/* 태그 목록 */}
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

      {/* 생성일 */}
      <p className="mt-4 text-xs text-slate-500">
        {log.createdAt}
      </p>
    </Link>
  )
}

export default ErrorLogCard