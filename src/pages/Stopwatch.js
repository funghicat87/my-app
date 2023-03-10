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
    setTime(0);
    setChangeBtn("START");
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
      return "StopwatchStartBTN"
    }
    else {
      return "StopwatchStopBTN"
    }
  }

  return (
    <div className="StopwatchContainer">
      <div className="StopwatchMain">
        <div className="StopwatchTime">
        {turnToFormat(time)}
        </div>
        <button className={changeCss()} onClick={startBtn}>{changeBtn}</button>
        <div className="StopwatchMainBTNContainer">
          <button onClick={lapBtn}>Lap</button>
          <button onClick={resetBtn}>Reset</button>
          <button onClick={clearlapsBtn}>Clear Laps</button>
        </div>
        <div className="StopwatchList">
          {lap.map(listLapCallback)}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
