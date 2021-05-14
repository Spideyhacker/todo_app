import React from "react";

export default function TextListItem({ todo, in_progress, id }) {
  return (
    <div>
      <p>{todo}</p>
    </div>
  );
}
