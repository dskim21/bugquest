import { NavLink } from 'react-router-dom'
import { BarChart3, BookOpen, Bug, Home, PlusCircle, Settings, X } from 'lucide-react'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/logs', label: 'Error Logs', icon: Bug },
  { path: '/logs/new', label: 'New Log', icon: PlusCircle },
  { path: '/quests', label: 'Quests', icon: BookOpen },
  { path: '/stats', label: 'Stats', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
]

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* 모바일에서 사이드바 뒤에 깔리는 어두운 배경 */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-800 bg-slate-950 p-4 transition-transform md:static md:z-auto md:min-h-screen md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-violet-400">BugQuest</h1>
            <p className="mt-1 text-sm text-slate-500">Debug. Learn. Level up.</p>
          </div>

          {/* 모바일에서 사이드바 닫는 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 md:hidden"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/logs' || item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                    isActive
                      ? 'bg-violet-500 text-white'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar