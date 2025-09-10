import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./GradePage.css"; 

const baseUrl = "http://localhost:3000"; 

const GradePage = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(`${baseUrl}/student/submission/${submissionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmission(res.data);
      } catch (err) {
        console.error("Error fetching submission:", err.response || err);
      }
    };
    fetchSubmission();
  }, [submissionId, token]);

  if (!submission) return <p className="grade-loading">Loading...</p>;

  return (
    <div className="grade-container">
      <button className="grade-back-btn" onClick={() => navigate(-1)}>Back</button>
      <h2 className="grade-title">Your Grade</h2>
      <p className="grade-total">Total Score: {submission.totalScore}</p>
      <p className="grade-submitted">Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
      
      <h3 className="grade-answers-title">Answers:</h3>
      <ul className="grade-answers-list">
        {submission.answers.map((answer, index) => (
          <li key={index} className="grade-answer-item">
            <span className="grade-question">Your Answer:</span> {answer.answer}, 
            <span className="grade-points"> point:</span> {answer.pointEarned}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradePage;
