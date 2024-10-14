'use client'

import { useEffect } from 'react'

export default function ErrorBoundaryPage({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h1>{error && JSON.stringify(error)}</h1>
    </div>
  )
}
