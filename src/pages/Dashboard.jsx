import { Link } from 'react-router-dom'

import StatCard from '../components/common/StatCard'
import { questTemplates } from '../data/questTemplates'
import useLogStore from '../store/useLogStore'

const Dashboard = () => {
  // LocalStorage와 연결된 실제 로그 데이터 가져오기
  const logs = useLogStore((state) => state.logs)

  // 전체 로그 개수
  const totalErrors = logs.length

  // 최근 7일 기준 날짜 계산
  const today = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(today.getDate() - 7)

  // createdAt이 최근 7일 안에 포함되는 로그만 필터링
  const weeklyLogs = logs.filter((log) => {
    const createdDate = new Date(log.createdAt)
    return createdDate >= sevenDaysAgo
  }).length

  // 난이도별 개수 계산
  const hardLogs = logs.filter((log) => log.difficulty === 'hard').length

  // 최근 작성한 로그 3개만 보여주기
  const recentLogs = logs.slice(0, 3)

  // 로그 태그 개수를 계산해서 많이 나온 태그를 찾는다.
  const tagCountMap = logs.reduce((acc, log) => {
    log.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })

    return acc
  }, {})

  // 가장 많이 나온 태그 1개를 찾는다.
  const topTag = Object.entries(tagCountMap).sort((a, b) => b[1] - a[1])[0]?.[0]

  // 가장 많이 나온 태그와 관련된 퀘스트를 추천한다.
  // 관련 태그가 없으면 기본 퀘스트를 보여준다.
  const todayQuest =
    questTemplates.find((quest) => quest.relatedTag === topTag) ||
    questTemplates.find((quest) => quest.relatedTag === 'General')

  return (
    <div>
      {/* 상단 인사 영역 */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome to BugQuest 🚀
        </h1>

        <p className="mt-2 text-slate-400">
          오늘도 실수를 성장 경험치로 바꿔보자.
        </p>
      </section>

      {/* 실제 로그 데이터를 기반으로 한 통계 카드 */}
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Errors"
          value={totalErrors}
          description="누적 기록한 실수"
        />

        <StatCard
          title="Weekly Logs"
          value={weeklyLogs}
          description="최근 7일 기록"
        />

        <StatCard
          title="Hard Errors"
          value={hardLogs}
          description="난이도 hard 기록"
        />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* 최근 실수 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-xl font-semibold text-white">
            Recent Logs
          </h2>

          <div className="mt-4 space-y-3">
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => (
                <Link
                  key={log.id}
                  to={`/logs/${log.id}`}
                  className="block rounded-xl bg-slate-900 p-4 transition hover:bg-slate-800"
                >
                  {/* 최근 기록 제목 */}
                  <p className="font-medium text-white">
                    {log.title}
                  </p>

                  {/* 에러 메시지는 한 줄만 보여준다 */}
                  <p className="mt-1 line-clamp-1 text-sm text-slate-400">
                    {log.errorMessage}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-slate-400">
                아직 기록된 실수가 없습니다.
              </p>
            )}
          </div>
        </div>

        {/* 오늘의 퀘스트 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-xl font-semibold text-white">
            Today's Quest
          </h2>

          {todayQuest ? (
            <Link
              to="/quests"
              className="mt-4 block rounded-xl bg-slate-900 p-4 transition hover:bg-slate-800"
            >
              {/* 추천 퀘스트 제목 */}
              <p className="font-medium text-white">
                {todayQuest.title}
              </p>

              {/* 추천 퀘스트 설명 */}
              <p className="mt-2 text-sm text-slate-400">
                {todayQuest.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                  #{todayQuest.relatedTag}
                </span>

                <span className="text-xs font-medium text-violet-400">
                  +{todayQuest.xp} XP
                </span>
              </div>
            </Link>
          ) : (
            <p className="mt-4 text-slate-400">
              추천할 퀘스트가 없습니다.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard