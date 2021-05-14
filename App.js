import "./App.css";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";
import { db } from "./firebase_config";

function App() {
  const [todos, setTodos] = useState([]);
  // function to add todo to firebase
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    var localTodos = [];
    db.collection("Todos").onSnapshot(function (querySnapshot) {
      querySnapshot.docs.map((doc) => {
        localTodos.push({
          id: doc.id,
          todo: doc.data().todo,
          in_progress: doc.data().inprogress,
        });
      });

      setTodos(localTodos);
    });
  }

  // to add the todo to the firebase

  function addTodo(e) {
    e.preventDefault();

    db.collection("Todos").add({
      in_progress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }
  return (
    <div className="App">
      <h1 className="App-header">Shashwat Tiwari's To-do App</h1>
      <form>
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
          style={{ maxwidth: "150px", width: "30vw", marginleft: "100px" }}
        />

        <button
          type="submit"
          className="button"
          variant="contained"
          onClick={addTodo}
        >
          Submit
        </button>
      </form>

      {todos.map((todo) => (
        <TodoListItem
          todo={todo.todo}
          in_progress={todo.inprogress}
          id={todo.id}
        />
      ))}
    </div>
  );
}

export default App;
