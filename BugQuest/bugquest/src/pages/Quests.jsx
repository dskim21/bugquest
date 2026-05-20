import QuestCard from '../components/quests/QuestCard'
import { questTemplates } from '../data/questTemplates'
import useLogStore from '../store/useLogStore'
import useQuestStore from '../store/useQuestStore'

const Quests = () => {
  const logs = useLogStore((state) => state.logs)

  const completedQuestIds = useQuestStore((state) => state.completedQuestIds)
  const xp = useQuestStore((state) => state.xp)
  const level = useQuestStore((state) => state.level)
  const completeQuest = useQuestStore((state) => state.completeQuest)

  // 로그에 기록된 태그가 몇 번 나왔는지 계산한다.
  const tagCountMap = logs.reduce((acc, log) => {
    log.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })

    return acc
  }, {})

  // 가장 많이 등장한 태그 순서대로 정렬한다.
  const frequentTags = Object.entries(tagCountMap)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)

  // 많이 나온 태그와 관련된 퀘스트를 우선 추천한다.
  const recommendedQuests = [...questTemplates].sort((a, b) => {
    const aIndex = frequentTags.indexOf(a.relatedTag)
    const bIndex = frequentTags.indexOf(b.relatedTag)

    // 관련 태그가 없으면 뒤로 보내기 위해 큰 숫자를 사용한다.
    const normalizedAIndex = aIndex === -1 ? 999 : aIndex
    const normalizedBIndex = bIndex === -1 ? 999 : bIndex

    return normalizedAIndex - normalizedBIndex
  })

  return (
    <div>
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Daily Quests
        </h1>

        <p className="mt-2 text-slate-400">
          기록한 실수를 바탕으로 오늘의 성장 퀘스트를 완료해보세요.
        </p>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <p className="text-sm text-slate-400">Current Growth</p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Lv. {level} · {xp} XP
        </h2>

        <div className="mt-4 h-3 rounded-full bg-slate-800">
          <div
            className="h-3 rounded-full bg-violet-500"
            style={{ width: `${xp % 100}%` }}
          />
        </div>
      </section>

      {/* 자주 나온 태그를 사용자에게 보여준다. */}
      <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
        <h2 className="text-lg font-semibold text-white">
          Recommended Focus
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {frequentTags.length > 0 ? (
            frequentTags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
              >
                #{tag}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              아직 기록된 태그가 없습니다. 로그를 추가하면 추천이 더 정확해져요.
            </p>
          )}
        </div>
      </section>

      <section className="grid gap-4">
        {recommendedQuests.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            isCompleted={completedQuestIds.includes(quest.id)}
            onComplete={completeQuest}
          />
        ))}
      </section>
    </div>
  )
}

export default Quests