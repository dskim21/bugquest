import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import useLogStore from '../store/useLogStore'
import { generateMockAiExplanation } from '../utils/mockAiExplanation'

const EditErrorLog = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // 현재 id에 해당하는 로그 찾기
  const log = useLogStore((state) =>
    state.logs.find((item) => item.id === id)
  )

  // store에서 수정 함수 가져오기
  const updateLog = useLogStore((state) => state.updateLog)

  // 기존 로그 데이터를 form 초기값으로 넣는다.
  const [formData, setFormData] = useState({
    title: log?.title || '',
    errorMessage: log?.errorMessage || '',
    situation: log?.situation || '',
    cause: log?.cause || '',
    solution: log?.solution || '',
    tags: log?.tags?.join(', ') || '',
    difficulty: log?.difficulty || 'easy',
  })

  // 없는 id로 접근했을 때 예외 처리
  if (!log) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white">
          수정할 기록을 찾을 수 없습니다.
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

  // 입력값이 바뀔 때 formData 업데이트
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // 수정 저장
  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.title.trim() || !formData.errorMessage.trim()) {
      alert('Title과 Error Message는 필수입니다.')
      return
    }

    // 수정된 로그 객체 생성
    const updatedLog = {
      title: formData.title,
      errorMessage: formData.errorMessage,
      situation: formData.situation,
      cause: formData.cause,
      solution: formData.solution,

      // 문자열로 입력된 태그를 배열로 변환
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),

      difficulty: formData.difficulty,
    }

    // 수정된 내용을 기준으로 AI Mock 설명도 다시 생성
    updatedLog.aiExplanation = generateMockAiExplanation(updatedLog)

    updateLog(id, updatedLog)
    navigate(`/logs/${id}`)
  }

  return (
    <div>
      <Link
        to={`/logs/${id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to detail
      </Link>

      <section className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Edit Error Log
        </h1>

        <p className="mt-2 text-slate-400">
          기록한 실수 내용을 다시 정리해보세요.
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
            to={`/logs/${id}`}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-900"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-violet-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
          >
            Update Log
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditErrorLog