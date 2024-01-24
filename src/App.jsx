import "./App.css";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<SignupPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
