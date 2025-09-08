import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "http://localhost:3000"; 

const GradePage = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const res = await axios.get(`${baseUrl}/student/submission/${submissionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmission(res.data);
        console.log("Submission data:", res.data); 
      } catch (err) {
        console.error("Error fetching submission:", err.response || err);
      }
    };
    fetchSubmission();
  }, [submissionId, token]);

  if (!submission) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Grade</h2>
      <p>Total Score: {submission.totalScore}</p>
      <p>Submitted At: {new Date(submission.submittedAt).toLocaleString()}</p>
      <h3>Answers:</h3>
      <ul>
        {submission.answers.map((answer) => (
          <li key={answer.question}>
            Question ID: {answer.question}, Your Answer: {answer.answer}, Points Earned: {answer.pointEarned}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradePage