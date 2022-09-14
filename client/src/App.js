import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import Teachers from "./pages/Teachers";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/teachers" element={<Teachers />}></Route>
          <Route path="/addSubject" element={<AddEdit />}></Route>
          <Route path="/update/:id" element={<AddEdit />}></Route>
          <Route path="/view/:id" element={<View />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
