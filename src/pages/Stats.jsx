import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import useLogStore from '../store/useLogStore'
import EmptyState from '../components/common/EmptyState'

const Stats = () => {
  // 저장된 로그 데이터를 통계 계산에 사용
  const logs = useLogStore((state) => state.logs)

  // 난이도별 개수 계산
  const difficultyData = [
    {
      name: 'easy',
      value: logs.filter((log) => log.difficulty === 'easy').length,
    },
    {
      name: 'normal',
      value: logs.filter((log) => log.difficulty === 'normal').length,
    },
    {
      name: 'hard',
      value: logs.filter((log) => log.difficulty === 'hard').length,
    },
  ]

  // 원형 차트 색상 (easy / normal / hard)
  const pieColors = [
    '#22c55e', // easy - 초록
    '#eab308', // normal - 노랑
    '#ef4444', // hard - 빨강
  ]

  // 태그별 개수 계산
  const tagCountMap = logs.reduce((acc, log) => {
    log.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })

    return acc
  }, {})

  const tagData = Object.entries(tagCountMap).map(([tag, count]) => ({
    tag,
    count,
  }))

  // 로그가 하나도 없을 때는 차트 대신 안내 화면 노출
  if (logs.length === 0) {
    return (
      <div>
        <section className="mb-6">
          <h1 className="text-3xl font-bold text-white">
            Stats
          </h1>

          <p className="mt-2 text-slate-400">
            어떤 실수가 반복되는지 데이터로 확인해보세요.
          </p>
        </section>

        <EmptyState
          title="아직 통계를 만들 데이터가 없습니다."
          description="에러 로그를 하나 이상 기록하면 차트가 표시됩니다."
        />
      </div>
    )
  }

  return (
    <div>
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Stats
        </h1>

        <p className="mt-2 text-slate-400">
          어떤 실수가 반복되는지 데이터로 확인해보세요.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {/* 난이도별 통계 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-semibold text-white">
            Difficulty Summary
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {/* 난이도별 색상 적용 */}
                  {difficultyData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={pieColors[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 태그별 통계 */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-lg font-semibold text-white">
            Tag Frequency
          </h2>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tagData}>
                {/* 다크모드용 grid 색상 */}
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                {/* 축 텍스트 색상 */}
                <XAxis
                  dataKey="tag"
                  stroke="#94a3b8"
                />

                <YAxis
                  allowDecimals={false}
                  stroke="#94a3b8"
                />

                {/* 툴팁 스타일 */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                  }}
                  labelStyle={{
                    color: '#fff',
                  }}
                />

                {/* 막대 색상 */}
                <Bar
                  dataKey="count"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Stats