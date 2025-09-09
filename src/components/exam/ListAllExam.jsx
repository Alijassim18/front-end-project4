import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import NavBarExam from "./NavBarExam";
import ExamDeleteButton from "./deltebtn";
import UpdateExamForm from "./updatePage";

const baseUrl = "http://localhost:3000";

const ExamList = () => {
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExam, setEditingExam] = useState(null); 

  const getAllExam = async () => {
    try {
      const url = `${baseUrl}/exam/`;
      const response = await axios.get(url);
      setExam(response.data);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllExam();
  }, []);

  if (editingExam) {

    return (
      <UpdateExamForm
        exam={editingExam}
        setFormIsShown={() => {
          setEditingExam(null); 
          getAllExam(); 
        }}
      />
    );
  }

  return (
    <div>
      <NavBarExam />
      <h2>Exam List</h2>

      {loading ? (
        <ClipLoader color="#FF00FF"  />
      ) : exam.length ? (
        <ul>
          {exam.map((oneExam) => (
            <li key={oneExam._id}>
              <h3>{oneExam.title}</h3>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(oneExam.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(oneExam.endDate).toLocaleString()}
              </p>

              <button onClick={() => setEditingExam(oneExam)}>Update</button>
              
              <ExamDeleteButton getAllExam={getAllExam} ExamId={oneExam._id} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No exams found.</p>
      )}
    </div>
  );
};

export default ExamList;
