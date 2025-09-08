import { useState } from "react"
import { createNewExam } from "../../../lib/exam/api"
import NavBarExam from "./NavBarExam"

const AddExamForm = ({ setFormIsShown }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    timer: "",
    questions: [
      {
        questionType: "mcq",
        text: "",
        answer: "",
        point: 1,
        options: [""], // options for MCQ or True/False
      },
    ],
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target
    const updatedQuestions = [...formData.questions]
    updatedQuestions[index][name] = value

    // Reset options when changing type
    if (name === "questionType") {
      if (value === "mcq") {
        updatedQuestions[index].options = ["", ""]
      } else if (value === "true_false") {
        updatedQuestions[index].options = ["True", "False"]
      } else {
        updatedQuestions[index].options = []
      }
    }

    setFormData({ ...formData, questions: updatedQuestions })
  }

  const handleOptionChange = (event, qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions]
    updatedQuestions[qIndex].options[optIndex] = event.target.value
    setFormData({ ...formData, questions: updatedQuestions })
  }

  const addOption = (qIndex) => {
    const updatedQuestions = [...formData.questions]
    updatedQuestions[qIndex].options.push("")
    setFormData({ ...formData, questions: updatedQuestions })
  }

  const removeOption = (qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions]
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, i) => i !== optIndex
    )
    setFormData({ ...formData, questions: updatedQuestions })
  }

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { questionType: "mcq", text: "", answer: "", point: 1, options: ["", ""] },
      ],
    })
  }

  const removeQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index)
    setFormData({ ...formData, questions: updatedQuestions })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const response = await createNewExam(formData)
      console.log("Exam created:", response)

      if (response.status === 201) {
        setFormIsShown(false)
        window.location.reload()
      }
    } catch (err) {
      console.error("Error creating exam:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <NavBarExam />
      <h2>Add New Exam</h2>
      <form onSubmit={handleSubmit}>
        {/* Exam Info */}
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="timer">Timer (minutes):</label>
        <input
          id="timer"
          type="number"
          name="timer"
          value={formData.timer}
          onChange={handleChange}
          required
        />

        {/* Questions */}
        <h3>Questions</h3>
        {formData.questions.map((q, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
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

            {/* Dynamic Options */}
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
                    <button type="button" onClick={() => removeOption(index, optIndex)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addOption(index)}>
                  + Add Option
                </button>
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
              <button type="button" onClick={() => removeQuestion(index)}>
                Remove Question
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
           Add Question
        </button>

        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default AddExamForm
