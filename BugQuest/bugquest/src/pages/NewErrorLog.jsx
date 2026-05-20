import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import useLogStore from '../store/useLogStore'
import { generateMockAiExplanation } from '../utils/mockAiExplanation'

const NewErrorLog = () => {
  const navigate = useNavigate()

  // store에서 addLog 함수만 꺼내서 사용
  const addLog = useLogStore((state) => state.addLog)

  // 입력값을 하나의 객체로 관리
  const [formData, setFormData] = useState({
    title: '',
    errorMessage: '',
    situation: '',
    cause: '',
    solution: '',
    tags: '',
    difficulty: 'easy',
  })

  // input, textarea, select 값이 바뀔 때 formData 업데이트
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 저장 버튼을 눌렀을 때 실행
  const handleSubmit = (event) => {
    event.preventDefault()

    // 제목과 에러 메시지는 필수값으로 처리
    if (!formData.title.trim() || !formData.errorMessage.trim()) {
      alert('Title과 Error Message는 필수입니다.')
      return
    }

    // "React, API, State" → ["React", "API", "State"]
    // 입력한 태그 문자열을 배열로 변환
    const parsedTags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    // 새 로그 객체 생성
    const newLog = {
      id: crypto.randomUUID(),
      title: formData.title,
      errorMessage: formData.errorMessage,
      situation: formData.situation,
      cause: formData.cause,
      solution: formData.solution,
      tags: parsedTags,
      difficulty: formData.difficulty,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    // 실제 API 대신 Mock AI 설명을 생성해서 로그 데이터에 함께 저장
    newLog.aiExplanation = generateMockAiExplanation(newLog)

    // Zustand store에 저장
    addLog(newLog)

    // 저장 후 목록 페이지로 이동
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

      <section className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          New Error Log
        </h1>

        <p className="mt-2 text-slate-400">
          오늘 만난 에러와 해결 과정을 기록해보세요.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
      >
        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Title
            </label>

            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="예: map is not a function"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Error Message
            </label>

            <textarea
              name="errorMessage"
              rows="4"
              value={formData.errorMessage}
              onChange={handleChange}
              placeholder="콘솔에 나온 에러 메시지를 붙여넣으세요."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Situation
            </label>

            <textarea
              name="situation"
              rows="3"
              value={formData.situation}
              onChange={handleChange}
              placeholder="어떤 상황에서 발생했나요?"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Cause
            </label>

            <textarea
              name="cause"
              rows="3"
              value={formData.cause}
              onChange={handleChange}
              placeholder="원인이 무엇이었나요?"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Solution
            </label>

            <textarea
              name="solution"
              rows="3"
              value={formData.solution}
              onChange={handleChange}
              placeholder="어떻게 해결했나요?"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tags
              </label>

              <input
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, API, State"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Difficulty
              </label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
              >
                <option value="easy">easy</option>
                <option value="normal">normal</option>
                <option value="hard">hard</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Link
            to="/logs"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-violet-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
          >
            Save Log
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewErrorLog