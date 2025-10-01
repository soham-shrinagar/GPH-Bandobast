import RegistrationPage from "./pages/Registration";
import LoginEmail from "./pages/LoginEmail";
import LoginId from "./pages/LoginId";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login-email" element={<LoginEmail />} />
      <Route path="/login-id" element={<LoginId />} />
    </Routes>
  );
}

export default App;
