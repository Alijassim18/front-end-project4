import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const baseUrl = "http://localhost:3000";

const StudentExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (!token) throw new Error("No token found, login required");

        const res = await axios.get(`${baseUrl}/exam/${examId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExam(res.data);
        setTimeLeft(res.data.timer * 60);

        const initialAnswers = res.data.questions.map((q) => ({
          question: q._id,
          answer: "",
        }));
        setAnswers(initialAnswers);

      
        const subRes = await axios.get(`${baseUrl}/student/submissions/${examId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (subRes.data.length > 0) {
          setAlreadySubmitted(true);
        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId, token]);


  useEffect(() => {
    if (finished || timeLeft <= 0 || alreadySubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [finished, timeLeft, alreadySubmitted]);

  const handleChange = (index, value) => {
    if (finished || alreadySubmitted) return;
    const updated = [...answers];
    updated[index].answer = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (submitting || finished || alreadySubmitted) return;
    setSubmitting(true);
    setFinished(true);

    try {
      const res = await axios.post(
        `${baseUrl}/student/`,
        { examId, answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Exam submitted! Score: " + res.data.totalScore);
      navigate("/student");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting exam");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <ClipLoader color="#FF00FF" size={40} />;
  if (!exam) return <p>Exam not found</p>;
  if (alreadySubmitted) return <p>You have already submitted this exam.</p>;

  const formatTime = (s) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div>
      <h2>{exam.title}</h2>
      <p><strong>Start:</strong> {new Date(exam.startDate).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(exam.endDate).toLocaleString()}</p>
      <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {exam.questions.map((q, index) => (
          <div key={q._id} style={{ marginBottom: "15px" }}>
            <p><strong>Q{index + 1}:</strong> {q.text} ({q.point} pts)</p>

            {q.questionType === "mcq" &&
              q.options.map((opt, i) => (
                <label key={i} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={opt}
                    checked={answers[index]?.answer === opt}
                    onChange={(e) => handleChange(index, e.target.value)}
                    disabled={finished || alreadySubmitted}
                  />
                  {opt}
                </label>
              ))}

            {q.questionType === "true_false" &&
              ["True", "False"].map((opt) => (
                <label key={opt} style={{ display: "block" }}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={opt}
                    checked={answers[index]?.answer === opt}
                    onChange={(e) => handleChange(index, e.target.value)}
                    disabled={finished || alreadySubmitted}
                  />
                  {opt}
                </label>
              ))}

            {q.questionType === "text" && (
              <input
                type="text"
                value={answers[index]?.answer || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={finished || alreadySubmitted}
                required
              />
            )}
          </div>
        ))}

        <button type="submit" disabled={submitting || finished || alreadySubmitted}>
          {submitting ? "Submitting..." : "Submit Exam"}
        </button>
      </form>
    </div>
  );
};

export default StudentExamPage;
