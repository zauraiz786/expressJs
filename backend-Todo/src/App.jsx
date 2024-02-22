import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    axios
      .get(`https://silly-gabardine-foal.cyclic.app/api/v1/todo`)
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const todoVal = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoVal.current.value === "") {
      alert("You must Enter Title");
      return;
    }
    todo.unshift({
      title: todoVal.current.value,
    });
    setTodo([...todo]);
    axios.post(`https://silly-gabardine-foal.cyclic.app/api/v1/todo`, {
      title: todoVal.current.value,
    });
    console.log(todo);
    todoVal.current.value = "";
  };

  const deleteTodo = (index, id) => {
    axios.delete(`https://silly-gabardine-foal.cyclic.app/api/v1/todo/${id}`);
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  const editTodo = (index, id) => {
    const editedValue = prompt("Enter Value", todo[index].title);
    axios.put(`https://silly-gabardine-foal.cyclic.app/api/v1/todo/${id}`, {
      title: editedValue,
    });
    todo[index].title = editedValue;
    setTodo([...todo]);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Todo" ref={todoVal} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todo.length > 0 ? (
          todo.map((items, index) => (
            <div key={index}>
              <li>{items.title}</li>
              <button
                onClick={() => {
                  deleteTodo(index, items.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  editTodo(index, items.id);
                }}
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <h3>No Todo Found</h3>
        )}
      </ul>
    </>
  );
};

export default App;
