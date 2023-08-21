import { useEffect, useState } from 'react'

import { RouterProvider } from 'react-router-dom'

import { Loader, ProgressLine } from 'assets/loaders'
import { router } from 'routing.tsx'
import { useMeQuery } from 'services/auth'

export function App() {
  const { isLoading, isUninitialized, data } = useMeQuery()
  const [initializationComplete, setInitializationComplete] = useState(isUninitialized)

  useEffect(() => {
    setInitializationComplete(true)
  }, [data])

  if (!initializationComplete) return <Loader />

  return (
    <div>
      {isLoading && <ProgressLine />}
      <RouterProvider router={router} />
    </div>
  )
}
