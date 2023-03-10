import './ToDo.css';
import  { useState } from "react";
import useModal from "../components/useModal";
import Modal from "../components/Modal";


function ToDo() {
  const {isShowing, toggle} = useModal();
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  function listMapCallback(ele,idx,arr){
    return (
      <label className="ToDoLabel" >
        <div id="CheckList">
          <input type='checkbox' checked={ele.checked} onChange={()=>changeCheckbox(ele.id)}/>
          <span><div>{ele.text}</div></span>
        </div>
        <button onClick={()=>delList(ele.id)}>刪除</button>
      </label>
    );
  }

  function changeCheckbox(id){
    function changeCheckboxCallback(ele,idx,arr){
      if (ele.id===id){
        ele.checked = !ele.checked;
        return ele
      }else{
        return ele
      }
    }
    setList(list.map(changeCheckboxCallback))
  }

  function delList(id){
    function delListCallback(ele,idx,arr){
      return id !== ele.id
    }
    // 過濾id得出新的list
    let delListFilter = list.filter(delListCallback)
    // 將新的list塞到list
    setList(delListFilter)
  }
  
  function addList(){
    // 新增物件
    let a={
      id:Date.now(),
      text:text
    }
    // 串接物件 concat
    if (text !== ""){
      setList(list.concat(a))
      // 更新list
    }
    else{
      // alert("Are you sure? 你要確定內?")
      toggle()

    }    
  }

  function changeList(event){
    // e.target.value
    setText(event.target.value)
  }

  return (
    <div className='ToDoMain'>
      <div className="ToDoAdd">
        <h1>TO DO LIST</h1>
        <input type='text' value={text} onChange={changeList}/>
        <button onClick={addList} >新增</button>
      </div>
      <div className="ToDoList">
        {list.map(listMapCallback)}
      </div>
      <Modal isShowing={isShowing} hide={toggle} title={"Dialog"} content={"你要確定？"}/>
    </div>
  );
}
export default ToDo;
