import React, { useState } from "react";
import { Button, Form, Input, Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faTrash,
  faPenSquare
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

//Todo Component
function Todo({ todo, index, completeTodo, deleteTodo, editTodo }) {
  return (
    <Row className="text-left">
      <div
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "",
          width: 800
        }}
      >
        <Col>
          <p>
            {index + 1}){todo.text}
            <Button
              color="danger"
              className="float-right"
              size="sm"
              onClick={() => deleteTodo(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              className="float-right"
              color="primary"
              size="sm"
              onClick={() => editTodo(index)}
            >
              <FontAwesomeIcon icon={faPenSquare} />
            </Button>
            <Button
              className="float-right"
              color="success"
              size="sm"
              onClick={() => completeTodo(index)}
            >
              <FontAwesomeIcon icon={faCheckSquare} />
            </Button>
          </p>
        </Col>
      </div>
    </Row>
  );
}

//Form for the Todo
function TodoForm({ addTodo, editTodo }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  }
  return (
    <Form onSubmit={handleSubmit} className="form-inline">
      <Input
        style={{ width: 695 }}
        type="text"
        value={value}
        placeholder="Add Todo"
        onChange={e => setValue(e.target.value)}
      />
      <Button outline color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

//Main App

function App() {
  const [todos, setTodos] = useState([
    { text: `Iron clothes`, isCompleted: false, isEdit: 0 },
    { text: `Doing chores`, isCompleted: false, isEdit: 0 },
    { text: `Taking dog to the park`, isCompleted: false, isEdit: 0 },
    { text: `Learn the react hooks`, isCompleted: false, isEdit: 0 }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodo = [...todos];
    newTodo.splice(index, 1);
    setTodos(newTodo);
  };

  const editTodo = (index, e) => {
    return <TodoForm value={index} />;
  };
  return (
    <Container>
      <div className="app">
        <h1 style={{ width: 200 }} className=" mx-auto">
          Todos:{" "}
        </h1>
        <div style={{ marginLeft: 150 }}>
          {todos.map((todo, index) => (
            <Todo
              todo={todo}
              index={index}
              key={index}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    </Container>
  );
}

export default App;
