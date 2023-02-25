import  { useState } from "react";
import './TicTacToe.css';

function rollDice() {
  let num = Math.floor(Math.random() * 20);
  if (num % 2 === 0) {
    return "o";
  }else {
    return "x";
  }
}

function getCX(c, svg="TicSvgStop", circle="", line=""){
  if (c==="o"){
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        className={svg}
      >
        <circle className={circle} cx="12" cy="12" r="8"></circle>
      </svg>
    )
  }else if (c==="x"){
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={svg}
      >
        <line className={line} x1="18" y1="6" x2="6" y2="18"></line>
        <line className={line} x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    )
  }
}

function TicTacToe() {
  const [box, setBox] = useState([
    "","","","","","","","",""
  ])
  const [player, setPlayer] = useState(rollDice())
  const [winner, setWinner] = useState("")

  /*************
    判斷
  *************/
  const checkRow = ()=>{
    let res = false;
    let temp = false;
    for(let i=0; i<9; i+=3){ // 0 3 6
      temp = box[i]===box[i+1] && box[i]===box[i+2] && box[i]!==""
      res = res | temp
    }
    return res
  }

  const checkCol = ()=>{
    let res = false;
    let temp = false;
    for(let i=0; i<3; i+=1){ // 0 1 2
      temp = box[i]===box[i+3] && box[i]===box[i+6] && box[i]!==""
      res = res | temp
    }
    return res
  }

  const checkDia = ()=>{
    // 0 4 8  2 4 6
    let res = box[0]===box[4] && box[0]===box[8] && box[0]!=="";
    let temp = box[2]===box[4] && box[2]===box[6] && box[2]!=="";
    return res | temp
  }

  const checkTie = ()=>{
    // box[0]!=="" && box[1]!=="" && box[2]!=="" && box[3]!=="" &&
    let res = true;
    let temp = false;
    for(let i=0; i<9; i+=1){ // 012345678
      temp = box[i]!==""  // 有值回傳true
      res = temp && res
    }
    return res
  }

  /*************
    點擊事件
  *************/
  const Clickhandle = (index) =>{
    if(box[index]==="" && winner==="" ){
      box[index] = player
      setBox([...box])
      if (checkRow() | checkCol() | checkDia()){
        console.log("win")
        setWinner(player)
      }else if (checkTie()){
        console.log("tie")
        setWinner("t")
      }else{
        console.log("continue")
        if (player==="o"){
          setPlayer("x")
        }else{
          setPlayer("o")
        }
      }
    }
    else{
      console.log("打咩")
    }
  }

  /*************
    重置事件
  *************/
  const Reset = () => {
    setBox(["","","","","","","","",""])
    setPlayer(rollDice())
    setWinner("")
  }
  
  /*************
    渲染九宮格
  *************/
  const createBox = ()=>{
    function callback(ele, idx, arr){
      return (
        <div className="TicBox" onClick={()=>Clickhandle(idx) }>
          { getCX(box[idx], "TicSvg", "TicCircle", "TicLine") }
        </div>
      )
    }
    return box.map(callback)
  }

  const getWinner = (winner)=>{
    if (winner!=="" && winner!=="t"){
      return <div className="TicWords">{getCX(winner)} is winner !</div>
    }else if(winner==="t"){
      return <div className="TicWords">TIE/DRAW</div>
    }
  }


  return (
    <div className="TicMain">
      <div className={winner!==''? "TicFadeIn TicResult":"TicResultFadeOut TicResult"}>
        {getWinner(winner)}
        <button className="TicBtn" onClick={Reset}>AGAIN</button>
      </div>
      <div className={winner!==''? "TicFadeOut TicShowGame":"TicFadeIn TicShowGame"}>
        <div className="TicWords">Player {getCX(player)}</div>
        <div className="TicContainer">
          {createBox()}
        </div>
        <button className="TicBtn" onClick={Reset}>RESET</button>
      </div>
    </div>
  );
}

export default TicTacToe;