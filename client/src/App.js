import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskListProvider from "./TaskListProvider";
import TaskProvider from "./TaskProvider";
import Layout from "./Layout";
import TaskList from "./TaskList";
import Task from "./Task";

function App() {
  //const [searchParams] = useSearchParams();
  //const taskListId = searchParams.get("list");
  //const taskId = searchParams.get("task");

  return (
    <div id="app-container">
      <TaskListProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="list" element={<TaskList />} />
                <Route path="task" element={<Task />} />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </TaskListProvider>
    </div>
  );
}

export default App;
