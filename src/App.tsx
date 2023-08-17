import { useEffect, useState } from 'react'

import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}
