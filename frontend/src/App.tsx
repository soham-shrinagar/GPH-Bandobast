import RegistrationPage from "./pages/Registration";
import LoginEmail from "./pages/LoginEmail";
import LoginId from "./pages/LoginId";
import DashboardPage from "./pages/DashboardPage";
import { Routes, Route } from "react-router-dom";
import NotificationSender from "./pages/Notification";
import Landing from "./pages/Landing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login-email" element={<LoginEmail />} />
      <Route path="/login-id" element={<LoginId />} />
      <Route path="/main" element={<DashboardPage/>}/>
      <Route path="/notification" element={<NotificationSender/>}/>
    </Routes>
  );
}

export default App;
