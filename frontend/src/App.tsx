import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

console.log('Square component 1');
type SquareValue = 'O'|'X'|null|string; // une string de number pour pouvoir écrire ce qu'on veut dedans
type SquareProps = {
  value: SquareValue;
  square_onclick: ()=>void
    
  };
/* const Square = ({ value }: SquareProps) => {

syntaxe avec un paramètre

équivalent a function Square {
}
*/
const Square = ({ value, square_onclick }: SquareProps) => {


  return (<>
    <button onClick={square_onclick} className="square">
      {value}
    </button>
  </>);

}


const victoire_affichage=(value:string)=>{

  return (

    `Bravooooooo ${value}`
 
  )
}

const calculateWinner= (all_sqr : SquareValue[]): string => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let res:string = '';

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (all_sqr[a] && all_sqr[a] === all_sqr[b] && all_sqr[a] === all_sqr[c]) {
      console.log("bravisimooo");
      

      res=all_sqr[a];

    }
  }
  return res;
};



const Board = ()=>{ 


  const board_row=3;
  const board_col=3;
  const [winner,setWinner]=useState<string>('');
  const [val_status,setVal_status]=useState<string>('Tour du X');
  const [OX,setOX]= useState(true);

  const [all_square,set_all_square]= useState<Array<SquareValue>>(Array(board_col*board_row).fill(null));

  function click_fun(i:number)
  {
    if (all_square[i])
    {
      return;
    }
    if (winner != '')
    {
      return;
    }
    const new_tab=all_square.slice();
    if(OX===true)
    {
      console.log(`test du XXXXX ${i}`)

      new_tab[i] = 'X';
      setOX(false);
      setVal_status("Tour du O");


    }
    if (OX===false) 
    {
      console.log(`test du OOOO ${i}`)

      new_tab[i]='O';
      setOX(true);
      setVal_status("Tour du X");

    }
    setWinner(calculateWinner(new_tab)); // soit on le fait sur la copie du tableau ici
                // soit on le fait après le changement du tableau sur l'original
    let winner_local: SquareValue = calculateWinner(new_tab)

    if (winner_local){
      setVal_status(victoire_affichage(winner_local));
      console.log(`le gagnant est ${winner}`)

    }
  set_all_square(new_tab);

  }



return(<>
  <div className='status'>
    <h1>{val_status}</h1>
  </div>
  <div className="body">
    {[...Array(board_row)].map((_,row_index: number) => (
      <div className="row" key={row_index}>
        {[...Array(board_col)].map((_, col_index: number) => {
          const index = row_index * board_col + col_index;
          return (
            <Square key={index} value={all_square[index]} square_onclick={()=>click_fun(index)}/>
          );
        })}
      </div>
    ))}
  </div>

{/* syntaxe commentaire dans un return 
  sinon la syntaxe classique*/}
</>
)

}
export {Board};


const Historique = ()=>{




  return (
    <>
    
    </>
  )

}

const Game = () => {




  return (
    <>
      <div className='historique'> <Historique /> </div>
      <div className='board'> <Board /> </div>



    </>
  )

}

export {Game};

export {Historique};

function App() {
  console.log('Square component 2');

  const [count, setCount] = useState(0)

  return (
    <>
   
      <div className='game'> <Game /> </div>

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
