import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskListProvider from "./TaskListProvider";
import TaskProvider from "./TaskProvider";

function App() {
  return (
    <div style={componentStyle()}>
      <TaskListProvider>
        <TaskProvider>
          <BrowserRouter></BrowserRouter>
        </TaskProvider>
      </TaskListProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#187bcd",
  };
}

/*<Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<EventList />} />
              <Route
                path="eventDetail"
                element={
                  <EventProvider>
                    <EventRoute />
                  </EventProvider>
                }
              />
              <Route path="*" element={"not found"} />
            </Route>
          </Routes>*/

export default App;
