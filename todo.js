import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import "./todo.css";
import Button from "@material-ui/core/Button";
import { db } from "./firebase_config";

export default function TodoListItems({ todo, inprogress, id }) {
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <div className="todoList">
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "In progress" : "Completed"}
        />
      </ListItem>

      <Button onClick={toggleInProgress} className="donebtn">
        {inprogress ? "DONE" : "UNDONE"}
      </Button>
      <Button onClick={deleteTodo} className="crossbtn">
        ❌
      </Button>
    </div>
  );
}
