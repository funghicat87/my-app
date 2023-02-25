import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ToDo from "./pages/ToDo";
import Snake from "./pages/Snake";
import Stopwatch from "./pages/Stopwatch";
import TicTacToe from "./pages/TicTacToe";

function App() {
  return (
    <div className='Container'>
      <BrowserRouter>
        <div className='Sidebar'>
          <div className='SidebarBTN'>
            <Link to="/ToDo">ToDo</Link>
          </div>
          <div className='SidebarBTN'>
            <Link to="/Stopwatch">Stopwatch</Link>
          </div>
          <div className='SidebarBTN'>
            <Link to="/TicTacToe">TicTacToe</Link>
          </div>
          <div className='SidebarBTN'>
            <Link to="/Snake">Snake</Link>
          </div>
        </div>

        <div className='Main'>
          <Routes>
            <Route path="/Snake" element={<Snake />}/>
            <Route path="/Stopwatch" element={<Stopwatch />}/>
            <Route path="/ToDo" element={<ToDo />}/>
            <Route path="/TicTacToe" element={<TicTacToe />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
