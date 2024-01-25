import "./App.css";
import Homepage from "./Component/HomePage";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Component/CreatePage";
import UpdatePage from "./Component/UpdatePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/createuser" element={<CreatePage />}></Route>
        <Route path="/update/:id" element={<UpdatePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
