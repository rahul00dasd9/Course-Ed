// pages/course.jsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CoursePage() {
  const router = useRouter()
  const { id } = router.query

  const [course, setCourse] = useState(null)
  const [answers, setAnswers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [passed, setPassed] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!id) return
    const fetchCourse = async () => {
      const { data } = await supabase.from('courses').select('*').eq('id', id).single()
      setCourse(data)
      setAnswers(Array(data.quiz.length).fill(null))
    }
    fetchCourse()
  }, [id])

  const handleSubmit = async () => {
    let score = 0
    course.quiz.forEach((q, idx) => {
      if (answers[idx] == q.correct) score++
    })

    const isPassed = score === course.quiz.length
    setPassed(isPassed)
    setSubmitted(true)

    if (isPassed) {
      await supabase.from('user_progress').upsert({ email, course_id: id, completed: true })
    }
  }

  if (!course) return <p>Loading...</p>

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe src={course.video_url} className="w-full h-64" allowFullScreen></iframe>
      </div>
      <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 p-2 border w-full" />
      <div>
        <h2 className="text-xl mb-2">Quiz</h2>
        {course.quiz.map((q, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-medium">{idx + 1}. {q.q}</p>
            {q.a.map((opt, i) => (
              <label key={i} className="block">
                <input type="radio" name={`q-${idx}`} checked={answers[idx] === i} onChange={() => {
                  const copy = [...answers]
                  copy[idx] = i
                  setAnswers(copy)
                }} />
                {" "}{opt}
              </label>
            ))}
          </div>
        ))}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white" onClick={handleSubmit} disabled={submitted}>Submit Quiz</button>
        {submitted && (
          <div className="mt-4">
            {passed ? (
              <p className="text-green-600 font-bold">You passed! 🎉</p>
            ) : (
              <p className="text-red-600 font-bold">You did not pass. Try again.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
