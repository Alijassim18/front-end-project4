import { useState, useEffect } from "react";
import { UpdateExam } from "../../../lib/exam/api"; 
import NavBarExam from "./NavBarExam";

const UpdateExamForm = ({ exam, setFormIsShown }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(null);


  useEffect(() => {
    if (exam) {
      setFormData({
        ...exam,
        startDate: exam.startDate ? exam.startDate.slice(0, 16) : "",
        endDate: exam.endDate ? exam.endDate.slice(0, 16) : "",
        questions: exam.questions.map(q => ({
          ...q,
          options: q.options || (q.questionType === "mcq" ? ["", ""] : q.questionType === "true_false" ? ["True", "False"] : [])
        }))
      });
    }
  }, [exam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][name] = value;

    if (name === "questionType") {
      if (value === "mcq") updatedQuestions[index].options = ["", ""];
      else if (value === "true_false") updatedQuestions[index].options = ["True", "False"];
      else updatedQuestions[index].options = [];
    }

    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (e, qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[optIndex] = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options.push("");
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const removeOption = (qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== optIndex);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { questionType: "mcq", text: "", answer: "", point: 1, options: ["", ""] }
      ]
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await UpdateExam(formData._id, formData);
      console.log("Exam updated:", response);

      if (response.status === 200) {
        setFormIsShown(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating exam:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <NavBarExam />
      <h2>Update Exam</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Start Date:</label>
        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label>End Date:</label>
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label>Timer (minutes):</label>
        <input
          type="number"
          name="timer"
          value={formData.timer}
          onChange={handleChange}
          required
        />

        <h3>Questions</h3>
        {formData.questions.map((q, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <label>Type:</label>
            <select
              name="questionType"
              value={q.questionType}
              onChange={(e) => handleQuestionChange(e, index)}
            >
              <option value="mcq">MCQ</option>
              <option value="true_false">True/False</option>
              <option value="text">Text</option>
            </select>

            <label>Question Text:</label>
            <input
              type="text"
              name="text"
              value={q.text}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            {q.questionType === "mcq" && (
              <div>
                <h4>Options:</h4>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex}>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(e, index, optIndex)}
                      required
                    />
                    <button type="button" onClick={() => removeOption(index, optIndex)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => addOption(index)}>+ Add Option</button>
              </div>
            )}

            {q.questionType === "true_false" && (
              <div>
                <h4>Options:</h4>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex}>
                    <input type="text" value={opt} disabled />
                  </div>
                ))}
              </div>
            )}

            <label>Answer:</label>
            <input
              type="text"
              name="answer"
              value={q.answer}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            <label>Point:</label>
            <input
              type="number"
              name="point"
              value={q.point}
              onChange={(e) => handleQuestionChange(e, index)}
              required
            />

            {formData.questions.length > 1 && (
              <button type="button" onClick={() => removeQuestion(index)}>Remove Question</button>
            )}
          </div>
        ))}

        <button type="button" onClick={addQuestion}>Add Question</button>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateExamForm;
