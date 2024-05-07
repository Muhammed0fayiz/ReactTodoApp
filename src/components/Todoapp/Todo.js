import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Todo.css";
import AddTask from "./AddTask";
import ListTask from "./ListTask";

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const todoTasks = localStorage.getItem('TASKS');
    if(todoTasks === null) return [];
    return JSON.parse(todoTasks);
});

  useEffect(() => {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
    document.title = `You have ${tasks.length} pending task(s)`;
  }, [tasks]); // Added dependency array

  const addTask = (title) => {
    setTasks((currentTodos) => {
      return [
          ...currentTodos,
          {id: crypto.randomUUID(), title, completed: false}
      ]
  })

  };

  const removeTask = (index) => {
    const newTask = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
  };

  return (
    <>
      <div className="todo-container">
        <div className="header">TODO App</div>
        <div className="add-task">Add Task</div>
        <AddTask addTask={addTask} />
        <div className="tasks">List Task</div>
        {tasks.map((task, index) => (
          <ListTask
            key={index}
            task={task}
            removeTask={removeTask}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default Todo;
