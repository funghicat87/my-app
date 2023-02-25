import  { useState } from "react";
import './Stopwatch.css';

let interval;

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [lap, setLap] = useState([])
  const [changeBtn, setChangeBtn] = useState("START")

  const startBtn = ()=> {
    // check start stop
    if (changeBtn==="START"){
      // start
      clearInterval(interval);
      interval = setInterval(startTimer, 10);
      setChangeBtn("STOP")
    }
    else{
      // stop
      clearInterval(interval);
      setChangeBtn("START")
    }
  }

  const startTimer = () => {
    setTime((time)=>{
      console.log(time)
      return time + 10
    })
  }

  const resetBtn = ()=> {
    clearInterval(interval);
    setTime(0)
  }

  const lapBtn = ()=> {
    setLap(lap.concat(time))
  }

  const clearlapsBtn = ()=> {
    setLap([])
  }

  const turnToFormat = (num)=>{
    return ("0"+parseInt(num/1000/60)).substr(-2)+":"+("0"+parseInt(num/1000)%60).substr(-2)+":"+("0"+parseInt(num/10)).substr(-2)
  }

  function listLapCallback(ele,idx,arr){
    return <div>{turnToFormat(ele)}</div> ;
  }

  const changeCss = ()=>{
    if (changeBtn==="START"){
      return "start"
    }
    else {
      return "stop"
    }
  }

  return (
    <div className="container">
      <div className="time-container">
        <div className="main-time">
          {turnToFormat(time)}
        </div>
      </div>
      <button className={changeCss()} onClick={startBtn}>{changeBtn}</button>
      <div className="bar-container">
        <button onClick={lapBtn}>Lap</button>
        <button onClick={resetBtn}>Reset</button>
        <button onClick={clearlapsBtn}>Clear Laps</button>
      </div>
      <div className="laps-container">
        {lap.map(listLapCallback)}
      </div>
    </div>
  );
}

export default Stopwatch;
