import LoginPage from "./components/auth/loginPage"
import SignUp from "./components/super/addStudentForm"
import SignUpAdmins from "./components/super/addAdmins"
import MainPages from "./components/super/mainPage"
import UserList from "./components/super/ListAllUser"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/super" element={<MainPages/>} />
        <Route path="/super-addStudent" element={<SignUp/>}/>
        <Route path="/super-addAdmin" element={<SignUpAdmins/>} />
        <Route path="/list-allUser" element={<UserList/>} />
      

      </Routes>
    </Router>
  )
}

export default App