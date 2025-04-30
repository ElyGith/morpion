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

type BoardProps = 
{
    all_square: SquareValue[];
    val_status: string;
    OX: boolean;
    board_col: number;
    board_row: number;
    click_fun: Function;
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



const Board = (props:BoardProps)=>{ 
  const { all_square, val_status, OX, board_col, board_row, click_fun } = props;


 // const[historique_array,setHistorique] = useState<Array<Array<SquareValue>>>(Array(board_col*board_row).fill(null));

//  const [all_square,set_all_square]= useState<Array<SquareValue>>(Array(board_col*board_row).fill(null));


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
/* 
  const [val_status, setVal_status] = useState<string>('Tour du X');
  const [OX, setOX] = useState<boolean>(true);


  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(board_row).fill(null)]);

  On mets tout les éléments qu'on veut modifier avec Board et Historique (entre deux enfants)

*/
  const [val_status_val, setVal_status] = useState<string>('Tour du X'); //X est tjrs premier a jouer
  const [OX_val, setOX] = useState<boolean>(true); // true = X, false = O
  const board_col_val = 3;
  const board_row_val = 3;
  const[historique_array,setHistorique] = useState<Array<Array<SquareValue>>>(Array(board_col_val*board_row_val).fill(null));

  const [winner, setWinner] = useState<string>('');

  const [all_square,set_all_square]= useState<Array<SquareValue>>(Array(board_col_val*board_row_val).fill(null));

  const propsBoard: BoardProps = {
    board_col: board_col_val,
    board_row: board_row_val,
    all_square: all_square,
    val_status: val_status_val,
    OX: OX_val,
    click_fun: click_fun,
  };


  function click_fun(i: number) {
    if (all_square[i]) {
      return;
    }
    if (winner != '') {
      return;
    }
    const new_tab = all_square.slice();
    if (OX_val === true) {
      console.log(`test du XXXXX ${i}`)

      new_tab[i] = 'X';
      setOX(false);
      setVal_status("Tour du O");


    }
    if (OX_val === false) {
      console.log(`test du OOOO ${i}`)

      new_tab[i] = 'O';
      setOX(true);
      setVal_status("Tour du X");

    }
    setHistorique([...historique_array, new_tab]);
  

    setWinner(calculateWinner(new_tab)); // soit on le fait sur la copie du tableau ici
    // soit on le fait après le changement du tableau sur l'original
    let winner_local: SquareValue = calculateWinner(new_tab)
    //on stock le gagnant pour pouvoir garder la bonne valeur et l'utilisé derrière (ne pas utiliser le hook ici)

    if (winner_local) {
      setVal_status(victoire_affichage(winner_local));
      console.log(`le gagnant est ${winner}`)

    }
    set_all_square(new_tab);

  }

  return (
    <>
      <div className='historique'> <Historique /> </div> 
      <div className='board'> <Board {...propsBoard}/></div>

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
