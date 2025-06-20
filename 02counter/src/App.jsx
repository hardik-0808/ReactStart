import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  // let counter =1;
  let [counter,setCounter]=useState(0);
  const increase=()=>{
    if(counter<20){
      setCounter(counter+1);
    }
    // console.log("increased",counter);
  }
  const decrease=()=>{
    if(counter>0){
    setCounter(counter-1);
    }
    // console.log("decreased",counter);
  }
  return (
    <>
      <h1>React app</h1>
      <h2>Counter {counter}</h2>
      <button onClick={increase}>
        Increase counter
      </button>
      <button onClick={decrease}>
        decrease counter
      </button>
    </>
  )
}

export default App
