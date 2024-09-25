'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="m-12 bg-gray-700 p-12 text-white">
      <h2 className="text-3xl">Something went wrong!</h2>
      <p className='p-2'>
        process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        process.env.AIRTABLE_API_KEY, process.env.AIRTABLE_BASE_KEY,
        process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
      </p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

