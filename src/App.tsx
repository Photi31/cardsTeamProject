import { useState } from 'react'

import { Checkbox } from 'ui/checkBox/checkBox.tsx'

export function App() {
  const [check, setCheck] = useState(true)

  const setChe = () => {
    setCheck(!check)
  }

  console.log(check)

  return (
    <div>
      <Checkbox onChange={() => setChe()} checked={check} disabled={false} />
    </div>
  )
}
