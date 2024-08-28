import { useState, useEffect } from "react";


export default function App() {
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage,setErrorMessage]=useState("")
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState(0)
  const [inputcolor, setinputcolor] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    
    setTodos((currrentTodos) => {
      const itemExists = currrentTodos.some((todo) => todo.title === newItem);

      if (itemExists | newItem == "") {
        setError(true);
        if(newItem == ""){
          setErrorMessage('invalid Entry')
          return currrentTodos; 
        }else{
          setErrorMessage('item already exists')
          return currrentTodos; 
        }
      }

      setError(false);

      return [
        ...currrentTodos,
        { id: crypto.randomUUID(), title: newItem, compleated: false },
      ];
    });

    setNewItem("");
  }
  const compleatedTodos = todos.filter((todo)=> todo.compleated)
  useEffect(()=> {

    const progressPercentage =todos.length === 0 ? 0 :(compleatedTodos.length/todos.length)*100;
    setProgress(progressPercentage)
  })
  console.log(progress)

 

  function ToggleTodo(id) {
    console.log("clicked");
    setTodos((currrentTodos) =>
      currrentTodos.map((todo) => {
        console.log(todo, "hello ");
        if (todo.id === id) {
          return { ...todo, compleated: !todo.compleated };
        } else {
          return todo;
        }
      })
    );
  }

  function deletetodo(id) {
    setTodos((todos) => todos.filter((todo) => todo.id != id));
  }

  const handleEdit =(title)=>{
    setNewItem(title);

    const idToDel = todos.filter((item)=>{
      return item.title==title
    })
    console.log(idToDel)
    const newid=idToDel[0].id
    console.log(newid)
    deletetodo(newid)
    



  }

  return (
    <>
 {/* forms---------------------------------------------- */}
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">TO DO</label>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            id="item" placeholder="enter the task"
            
          />
        </div>
        <button className="btn" >Add</button>
        {error && <p style={{ color: "red" }}>{errorMessage}</p>}

      </form>

 {/* forms---------------------------------------------- */}





      <h1 className="header"> Todo List</h1>
      <div className="taskyet"> 
      <ul className="list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.compleated}className="todolist" onChange={() => ToggleTodo(todo.id)}/>{todo.title} 
              </label>
              <div className="fa-solid fa-pen-to-square space-x-6 cursor-pointer" onClick={()=>handleEdit(todo.title)}></div>
              <button className="btn btn-danger bg-red-500 space-x-4" onClick={() => deletetodo(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>


      <div className="completed">
       { compleatedTodos.length > 0 && (
      <h1 className="header"> TaskCompleted</h1>
    )} 
        <ul className="list2">
       
          {todos.filter((todo)=> todo.compleated == true).map((compleated)=>{
            return (
              
              <li key={compleated.id}>
                <label>
                  <li>{compleated.title}</li>

                </label>

              </li>
            )
          })}
        </ul>
      </div>
      </div>
      
     <hr />
     <h3>Progress Bar</h3>
      <div className="progressBar" style={{'--progress-width': `${progress}%`}}></div>
      
    </>
  );
}


