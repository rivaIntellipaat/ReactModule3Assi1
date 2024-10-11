import React, { useState } from "react";
import { IoAdd, IoRadioButtonOn, IoRadioButtonOffSharp } from "react-icons/io5";
import { FaStar, FaRegStar, FaEdit, FaSave } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import "./Todo.css"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      toast.error("Error Occured!", {
        position: "top-center"
      });
      toast.warning("Cannot add Empty Todo", {
        position: "top-center"
      });
    }

    if (newTask.trim() !== "") {
      toast.success("Added Successfully !");
      const newTaskData = {
        id: Date.now(),
        text: newTask,
        completed: false,
        favorite: false,
        isEditing: false,
      };

      setTasks((prevTasks) => [newTaskData, ...prevTasks]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    toast.info("Deleted Successfully !", {
        position: "top-center"
    });
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  const toggleFavorite = (taskId) => {
    toast.info("Added to Favourite Successfully !", {
        position: "top-center"
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, favorite: !task.favorite } : task
      )
    );
  };

  const markCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (taskId, newText) => {
    toast.info("Updated Successfully !", {
        position: "top-center"
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  const handleToggleEditing = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const handleKeyPress = (e, taskId) => {
    if (e.key === "Enter") {
      handleEditTask(taskId, e.target.value);
    }
  };

  const renderTasks = () => {
    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    return [...uncompletedTasks, ...completedTasks].map((task) => (
      <li
        key={task.id}
        className={`fade-in-animation border-yellow-300 border-2 w-[400px] bg-[#fbf3bb] m-3 p-2 rounded-[8px] ${
          task.completed ? "line-through decoration-red-500" : ""
        } slide-in-animation`}
      >
        <div className="flex">
          <button onClick={() => markCompleted(task.id)}>
            {task.completed ? (
              <IoRadioButtonOn className=" text-2xl text-[#435a4e]" />
            ) : (
              <IoRadioButtonOffSharp className="text-2xl text-[#435a4e]" />
            )}
          </button>
          {task.isEditing ? (
            <div>
              <input
                className="text-lg p-2 m-3 rounded-[8px] w-[250px] outline-none"
                value={task.text}
                onChange={(e) =>
                  setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                      t.id === task.id ? { ...t, text: e.target.value } : t
                    )
                  )
                }
                onKeyPress={(e) => handleKeyPress(e, task.id)}
              />
            </div>
          ) : (
            <div className="flex justify-between w-[100%]">
              <div>
                <span
                  className={`text-lg mt-2 ml-5  ${
                    task.completed ? "completed" : ""
                  } ${task.isEditing ? "contentEditable" : ""}`}
                  contentEditable={task.isEditing}
                  onBlur={(e) => handleEditTask(task.id, e.target.textContent)}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  className="m-2 mb-4"
                  onClick={() => toggleFavorite(task.id)}
                >
                  {task.favorite ? <FaStar /> : <FaRegStar />}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          {task.isEditing ? (
            <div>
              <button
                className="m-2"
                onClick={() => handleEditTask(task.id, task.text)}
              >
                <FaSave className=" font-bold text-xl  " />
              </button>
            </div>
          ) : (
            <div>
              <button className="m-2  " onClick={() => deleteTask(task.id)}>
                <AiOutlineDelete className="text-xl  " />
              </button>
              <button
                className="m-2"
                onClick={() => handleToggleEditing(task.id)}
              >
                <FaEdit className=" text-xl " />
              </button>
            </div>
          )}
        </div>
      </li>
    ));
  };

  return (
    <div className="todo-list">
      <ToastContainer />
      <h2 className="text-5xl font-semibold text-lime-950 m-3 flex justify-center">
        Todo List
      </h2>
      <div className="shadow-[#435a4e] shadow-lg rounded-[8px] bg-white ">
        <div className="task-actions flex justify-center">
          <input
            className="border-[2px] pl-5 w-[400px] mt-6 rounded-[8px] border-[#fbf3bb]"
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? addTask() : null)}
          />
          <button
            className="flex bg-[#fbf3bb] m-2 mt-7 rounded-full p-3"
            onClick={addTask}
          >
            <IoAdd />
          </button>
        </div>
        <div className="flex justify-center h-[470px] w-[540px] scrollbar-hide overflow-y-scroll   mt-5">
          {tasks.length === 0 ? (
            <div className="flex justify-center items-center h-[400px]">
              <p className=" font-semibold text-2xl text-slate-500 ">
                You have no tasks
              </p>
            </div>
          ) : (
            <ul>{renderTasks()}</ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;


