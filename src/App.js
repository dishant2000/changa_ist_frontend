import logo from './logo.svg';
import './App.css';
import React,{useState,createContext} from 'react'
import Board from './changa/ui/components/board';
import Dice from './changa/ui/components/dice';
export const diceContext = createContext();
function App() {
  const [count,setCount] = useState(0);
  const arr = [1,2,3,4,8];
  const randomHandler = ()=>{
    let n = (arr[Math.floor(Math.random() * (4 - 0 + 1) ) + 0]);
    setCount(n);
  }
  return (
    <diceContext.Provider value = {{
      count : count,
      randGenerate : randomHandler
    }}>
      <div className="App">
        <Board/>
        <Dice/>
      </div>
    </diceContext.Provider>
  );
}

export default App;
