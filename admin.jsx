// pages/admin.jsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Admin() {
  const [title, setTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [quiz, setQuiz] = useState('')

  const upload = async () => {
    const parsedQuiz = JSON.parse(quiz)
    const { error } = await supabase.from('courses').insert([{ title, video_url: videoUrl, quiz: parsedQuiz }])
    alert(error ? 'Upload failed' : 'Uploaded!')
  }

  return (
    <div className="p-4">
      <h1 className="text-xl">Upload Course</h1>
      <input placeholder="Course Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Video URL" onChange={(e) => setVideoUrl(e.target.value)} />
      <textarea placeholder='Quiz JSON [{"q":"...","a":["a1","a2"],"correct":1}]' onChange={(e) => setQuiz(e.target.value)} />
      <button onClick={upload}>Upload</button>
    </div>
  )
}
