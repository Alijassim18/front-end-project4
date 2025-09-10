import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../logout";
import "./StudentExamList.css"; 

const baseUrl = "http://localhost:3000";

const StudentExamList = () => {
  const [exams, setExams] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchExams = async () => {
    try {
      const res = await axios.get(`${baseUrl}/exam`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(res.data);
    } catch (err) {
      console.error("Error fetching exams:", err.response || err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${baseUrl}/student/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err.response || err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchExams();
      await fetchSubmissions();
      setLoading(false);
    };
    fetchData();
  }, []);

  const hasSubmitted = (examId) => {
    return submissions.some((sub) => sub.exam.toString() === examId.toString());
  };

  const startExam = (examId) => {
    if (hasSubmitted(examId)) return;
    navigate(`/student/exam/${examId}`);
  };

  const viewGrade = (examId) => {
    const submission = submissions.find((sub) => sub.exam.toString() === examId.toString());
    if (submission) {
      navigate(`/student/grade/${submission._id}`);
    }
  };

  if (loading) return <ClipLoader color="#FF00FF" size={40} className="loading-spinner" />;

  return (
   
<div className="studentExam-container">
  <div className="studentExam-header">
    <h2 className="studentExam-title">Available Exams</h2>
    <LogoutButton />
  </div>
  {exams.length === 0 ? (
    <p className="studentExam-noExams">No exams available</p>
  ) : (
    <ul className="studentExam-list">
      {exams.map((exam) => {
        const now = new Date();
        const start = new Date(exam.startDate);
        const end = new Date(exam.endDate);
        const submitted = hasSubmitted(exam._id);

        const startDisabled = submitted || now < start || now > end;
        const startButtonText = submitted
          ? "Completed"
          : now < start
          ? "Not Started"
          : now > end
          ? "Closed"
          : "Start Exam";
        const viewDisabled = !submitted;

        return (
          <li key={exam._id} className="studentExam-item">
            <h3 className="studentExam-item-title">{exam.title}</h3>
            <p className="studentExam-item-date"><span>Start:</span> {start.toLocaleString()}</p>
            <p className="studentExam-item-date"><span>End:</span> {end.toLocaleString()}</p>
            <div className="studentExam-buttons">
              <button
                className="studentExam-btn startBtn"
                onClick={() => startExam(exam._id)}
                disabled={startDisabled}
              >
                {startButtonText}
              </button>
              <button
                className="studentExam-btn gradeBtn"
                onClick={() => viewGrade(exam._id)}
                disabled={viewDisabled}
              >
                View Grade
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  )}
</div>

  );
};

export default StudentExamList;
