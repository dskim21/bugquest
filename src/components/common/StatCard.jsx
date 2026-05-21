// 카드 컴포넌트 재사용을 위해 props 사용
// title = 카드 제목
// value = 숫자 값
// description = 보조 설명

const StatCard = ({ title, value, description }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-sm">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  )
}

export default StatCard