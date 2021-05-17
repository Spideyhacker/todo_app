import "./App.css";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";
import { db } from "./firebase_config";
import { Button } from "@material-ui/core";
import TodoListItem from "./Todo";

function App() {
  const [todos, settodos] = useState([]);
  // function to add todo to firebase
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    gettodos();
  }, []);

  function gettodos() {
    var localtodos = [];
    db.collection("todos").onSnapshot(function (querySnapshot) {
      querySnapshot.docs.map((doc) => {
        localtodos.push({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        });
      });

      settodos(localtodos);
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
  return (
    <div>
      <div>
        <h1 className="App-header">Shashwat Tiwari's To-do App</h1>
      </div>
      <div>
        <form>
          <TextField
            id="todo"
            label="Write a Todo"
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
          />

          <Button
            className="btn"
            type="submit"
            variant="contained"
            onClick={addTodo}
          ></Button>
        </form>
      </div>

      <div className="todos">
        {todos.map((todo) => (
          <TodoListItem
            todo={todo.todo}
            inprogress={todo.inprogress}
            id={todo.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
