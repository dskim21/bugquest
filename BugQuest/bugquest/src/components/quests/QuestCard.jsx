import { CheckCircle2 } from 'lucide-react'

const QuestCard = ({ quest, isCompleted, onComplete }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {quest.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {quest.description}
          </p>
        </div>

        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
          +{quest.xp} XP
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          #{quest.relatedTag}
        </span>

        <button
          type="button"
          onClick={() => onComplete(quest)}
          disabled={isCompleted}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
            isCompleted
              ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-400'
              : 'bg-violet-500 text-white hover:bg-violet-600'
          }`}
        >
          <CheckCircle2 size={16} />
          {isCompleted ? 'Completed' : 'Complete'}
        </button>
      </div>
    </div>
  )
}

export default QuestCard