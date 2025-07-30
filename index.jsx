// pages/index.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

export default function Home() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    supabase.from('courses').select('*').then(({ data }) => setCourses(data))
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl">Courses</h1>
      {courses.map(c => (
        <div key={c.id}>
          <Link href={`/course?id=${c.id}`}>
            <div className="p-2 border mt-2 cursor-pointer">{c.title}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}
