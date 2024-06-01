import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskListProvider from "./TaskListProvider";
import TaskProvider from "./TaskProvider";
import Layout from "./Layout";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";

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
                <Route path="/" element={<TaskList done={false} />} />
                <Route path="/completed" element={<TaskList done={true} />} />
                <Route
                  path="/today"
                  element={
                    <TaskList
                      done={false}
                      deadlineUntil={getCurrentDateFormatted()}
                    />
                  }
                />
                <Route
                  path="/next-7-days"
                  element={
                    <TaskList
                      done={false}
                      deadlineUntil={getCurrentDateFormatted(7)}
                    />
                  }
                />
                <Route path="list" element={<TaskList done={false} />} />
                <Route path="task" element={<TaskDetail />} />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </TaskListProvider>
    </div>
  );
}

function getCurrentDateFormatted(daysToAdd = 0) {
  const date = new Date();

  date.setDate(date.getDate() + daysToAdd);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default App;
