import  { useState, useRef, useEffect} from "react";
import './Snake.css';

let interval;

function Snake() {
  const cv = useRef(null)
  const [snake, setSnake]=useState([
    {x:10, y:60},
    {x:10, y:50},
    {x:10, y:40},
    {x:10, y:30},
    {x:10, y:20},
    {x:10, y:10},
  ])
  const [food, setFood]=useState({fx:-10, fy:-10})
  const [dir, setDir] = useState({
    dx:0, dy:10
  })
  const [score, setScore]=useState(0)
  const [isReady, setIsReady]=useState(true)
  const [level, setLevel]=useState(0)

  const getRandomFood = () => {
    let max = 49;
    let fx = Math.floor(Math.random()*max)*10;
    let fy = Math.floor(Math.random()*max)*10;
    setFood({fx:fx, fy:fy})
  };
  
  const drawFood  = ()=>{
    let ctx = cv.current.getContext("2d")
    ctx.fillStyle = 'rgb(243, 243, 243)';
    ctx.fillRect(food.fx+3, food.fy, 4, 3);
    ctx.fillRect(food.fx  , food.fy+3, 3, 4);
    ctx.fillRect(food.fx+7, food.fy+3, 3, 4);
    ctx.fillRect(food.fx+3, food.fy+7, 4, 3);
  }

  const drawSnake = ()=>{
    let ctx = cv.current.getContext("2d")
    snake.forEach(
      (ele, idx, arr)=>{
        ctx.fillStyle = 'rgb(243, 243, 243)';
        ctx.fillRect(ele.x, ele.y, 10, 10)
      }
    )
  }

  const clearCanvas = ()=>{
    let ctx = cv.current.getContext("2d")
    ctx.fillStyle = '#707C74';
    ctx.fillRect(0, 0, 500, 500);
  }

  const moveSnake = ()=>{
    let head = {
      x: snake[0].x + dir.dx,
      y: snake[0].y + dir.dy
    }
    let newSnake = snake;
    newSnake.unshift(head);
    if(head.x===food.fx && head.y===food.fy){
      // 新食物
      getRandomFood();
      setScore(score=>score+=1)
    }else{
      // 去尾巴
      newSnake.pop();
    }
    setSnake(newSnake)
  }  
  
  const changeDir = (e)=>{
    let {dx, dy} = dir;
    if (e.code === "ArrowUp" && dy !== 10) {
      dx = 0;
      dy = -10
    } else if (e.code === "ArrowDown" && dy !== -10) {
      dx = 0;
      dy = 10;
    } else if (e.code === "ArrowLeft" && dx !== 10) {
      dx = -10;
      dy = 0;
    } else if (e.code === "ArrowRight" && dx !== -10) {
      dx = 10;
      dy = 0;
    }
    setDir({dx:dx, dy:dy})
  }
  const hasGameEnd = () =>{
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    
    if(snake[0].x<=0 || snake[0].y<=0|| snake[0].x>=490|| snake[0].y>=490){
      return true;
    }else{
      return false;

    }
  }

  useEffect(()=>{
    if (!isReady){
      clearInterval(interval);
      interval = setInterval(()=>{
        if (hasGameEnd()){
          console.log("end")
          clearInterval(interval);
          setIsReady(true)
          setLevel(0);
          return
        }
        clearCanvas();
        moveSnake();
        drawSnake();
        drawFood();
      }, level);
    }
    document.addEventListener("keydown", changeDir);
    return () => {
      document.removeEventListener("keydown", changeDir);
    };
  }, [dir,food, isReady])

  const startBTN = ()=>{
    if(level!==0){
      setSnake([
        {x:10, y:60},
        {x:10, y:50},
        {x:10, y:40},
        {x:10, y:30},
        {x:10, y:20},
        {x:10, y:10},
      ])
      getRandomFood();
      setDir({dx:0, dy:10});
      setScore(0);
      setIsReady(false);
    }
  }
  
  const showBTN = ()=>{
    if (isReady){
      return (
        <div id="SnakeStartContainer" >
          <div id="SnakeLevelContainer">
            <label>
              <input className="SnakeInput" type="radio" onClick={()=>{setLevel(100)}} value="Easy" name="namelevel"/>
              <div>Easy</div>
            </label>
            <label>
              <input className="SnakeInput" type="radio" onClick={()=>{setLevel(50)}} value="Midium" name="namelevel"/>
              <div>Midium</div>
            </label>
            <label>
              <input className="SnakeInput" type="radio" onClick={()=>{setLevel(20)}} value="Hard" name="namelevel"/>
              <div>Hard</div>
            </label>
          </div>
          <button id="SnakePlayBTN" onClick={startBTN}>PLAY</button>
        </div>
      );
    }
  }
  
  return (
    <div  id="SnakeContainer">
        <div id="SnakeCanvasContainer">
          <div id="SnakeScore">Score : {score}</div>
          <canvas className="SnakeCanvas" ref={cv} width="500" height="500" ></canvas>
          {showBTN()}
        </div>
    </div>
  );
}

export default Snake;