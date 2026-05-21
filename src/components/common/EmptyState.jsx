const EmptyState = ({ title, description, action }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center">
      {/* 빈 상태 제목 */}
      <h2 className="text-lg font-semibold text-white">
        {title}
      </h2>

      {/* 빈 상태 설명 */}
      <p className="mt-2 text-sm text-slate-400">
        {description}
      </p>

      {/* 버튼이나 링크가 필요할 때만 보여준다 */}
      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState