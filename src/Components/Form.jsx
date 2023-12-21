import React from "react";

function Form({data}) {
  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            Name: {item.name}
            <br />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Form;
