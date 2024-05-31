import { useEffect, useState } from "react";
import { TaskListContext } from "./TaskListContext";

function TaskListProvider({ children }) {
  const [taskListLoadObject, setTaskListLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8123/tasklist/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setTaskListLoadObject({ state: "ready", data: responseJson.tasklists });
      return responseJson;
    } else {
      setTaskListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCreate(dtoIn) {
    //setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8123/tasklist/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskListLoadObject((current) => {
        current.data.push(responseJson);
        //current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        current.data.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTaskListLoadObject((current) => {
        return {
          state: "error",
          data: current.data,
          error: responseJson,
        };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8123/tasklist/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskListLoadObject((current) => {
        const taskListIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[taskListIndex] = responseJson;
        //current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        current.data.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTaskListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setTaskListLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8123/tasklist/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setTaskListLoadObject((current) => {
        const taskListIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(taskListIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setTaskListLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: taskListLoadObject.state,
    taskLists: taskListLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
}

export default TaskListProvider;
