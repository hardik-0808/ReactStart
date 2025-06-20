import { useState } from 'react'
import Hello from './Hello.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Hello />
    <h1>Why are you here</h1>
    </>
    
  )
  
}

export default App
