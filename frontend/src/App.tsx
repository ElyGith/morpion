import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

console.log('Square component 1');
type SquareValue = 'O'|'X'|null|number;
type SquareProps = {
  value: SquareValue;
};
/* const Square = ({ value }: SquareProps) => {

syntaxe avec un paramètre

équivalent a function Square {
}
*/

const Square = () => {

const [value,setValue]  = useState<SquareValue>(null);

  function handleClick() {
    console.log('You clicked !');
    setValue('X');

  }

  return (
    <button onClick={handleClick} className="square">
      {value}
    </button>
  );
};


function App() {
  console.log('Square component 2');

  const [count, setCount] = useState(0)

  return (
    <>
    <div className="todo-list" >
<div className='header'> </div>
<div className='body'> 
          <div className='row'>
             <Square />
            <Square  />
            <Square  />

          </div>
          <div className='row'>
            <Square />
            <Square  />
            <Square />
          </div>
           <div className='row'>
            <Square/>
            <Square />
            <Square  />
  </div>




  
</div>

    </div> {/* syntaxe commentaire*/}



      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
