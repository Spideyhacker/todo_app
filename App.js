import "./App.css";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";
import { db } from "./firebase_config";
import TodoListItems from "./todo";

function App() {
  const [todos, setTodos] = useState([]);
  // function to add todo to firebase
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );

      // setTodos(localtodos);
    });
  }

  // to add the todo to the firebase

  function addTodo(e) {
    e.preventDefault();

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }

  // function TextListItem({ todo, inprogress, id }) {
  //   return (
  //     <div>
  //       <p>{todo}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <h1 className="App-header">Shashwat Tiwari's To-do App</h1>
      <form className="textfield">
        <TextField
          id="todo"
          label="Write a Todo"
          className="task"
          variant="outlined"
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
            if (e.target.value.length > 120) {
              e.target.style.color = "red";
            } else {
              e.target.style.color = "#000";
            }
          }}
          style={{ maxwidth: "150px", width: "30vw" }}
        />

        <button
          type="submit"
          className="button"
          variant="contained"
          onClick={addTodo}
        ></button>
      </form>

      {todos.map((todo) => (
        <TodoListItems
          todo={todo.todo}
          inprogress={todo.inprogress}
          id={todo.id}
        />
      ))}
    </div>
  );
}

export default App;

// todo={todo.todo}
//           inprogress={todo.inprogress}
//           // id={todo.id}
