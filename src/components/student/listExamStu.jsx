import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

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
      console.log("Exams:", res.data); 
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
      console.log("Submissions:", res.data); 
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
    const submitted = submissions.some((sub) => sub.exam.toString() === examId.toString());
    console.log(`Has submitted for exam ${examId}: ${submitted}`); 
    return submitted;
  };

  const startExam = (examId) => {
    if (hasSubmitted(examId)) {
      alert("You have already submitted this exam!");
      return;
    }
    navigate(`/student/exam/${examId}`);
  };

  const viewGrade = (examId) => {
    const submission = submissions.find((sub) => sub.exam.toString() === examId.toString());
    console.log("Viewing grade for exam:", examId);
    console.log("Submission found:", submission);
    
    if (submission) {
      navigate(`/student/grade/${submission._id}`);
    } else {
      alert("You have not submitted this exam yet!");
    }
  };

  if (loading) return <ClipLoader color="#FF00FF" size={40} />;

  return (
    <div>
      <h2>Available Exams</h2>
      {exams.length === 0 ? (
        <p>No exams available</p>
      ) : (
        <ul>
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
              <li key={exam._id} style={{ marginBottom: "20px" }}>
                <h3>{exam.title}</h3>
                <p>
                  <strong>Start:</strong> {start.toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong> {end.toLocaleString()}
                </p>
                <button
                  onClick={() => startExam(exam._id)}
                  disabled={startDisabled}
                  style={{
                    marginRight: "10px",
                    backgroundColor: submitted
                      ? "#ccc"
                      : now < start
                      ? "#f0ad4e"
                      : now > end
                      ? "#d9534f"
                      : "#5cb85c",
                    color: "#fff",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: startDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  {startButtonText}
                </button>
                <button
                  onClick={() => viewGrade(exam._id)}
                  disabled={viewDisabled}
                  style={{
                    backgroundColor: submitted ? "#0275d8" : "#ccc",
                    color: "#fff",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: viewDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  View Grade
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StudentExamList;