import LoginPage from "./components/auth/loginPage";
import SignUp from "./components/super/addStudentForm";
import SignUpAdmins from "./components/super/addAdmins";
import MainPages from "./components/super/mainPage";
import UserList from "./components/super/ListAllUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddExamForm from "./components/exam/FormExam";
import ExamList from "./components/exam/ListAllExam";
import MainPagesExam from "./components/exam/mainExam";
import UpdateExamForm from "./components/exam/updatePage";
import StudentExamList from "./components/student/listExamStu";
import StudentExamPage from "./components/student/Exampage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/super" element={<MainPages />} />
        <Route path="/super-addStudent" element={<SignUp />} />
        <Route path="/super-addAdmin" element={<SignUpAdmins />} />
        <Route path="/list-allUser" element={<UserList />} />
        <Route path="/addExam" element={<AddExamForm />} />
        <Route path="/list-allExam" element={<ExamList />} />
        <Route path="/admin" element={<MainPagesExam />} />
        <Route path="/update-exam" element={<UpdateExamForm />} />
        <Route path="/student" element={<StudentExamList />} />
        <Route path="/student/exam/:examId" element={<StudentExamPage />} />
      </Routes>
    </Router>
  );
}

export default App;