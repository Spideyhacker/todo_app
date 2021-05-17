import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import "./todo.css";
import Button from "@material-ui/core/Button";

export default function TodoListItems({ todo, inprogress, id }) {
  return (
    <div className="todoList">
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "In progress" : "Completed"}
        />
      </ListItem>

      <Button variant="contained">Done</Button>
    </div>
  );
}
