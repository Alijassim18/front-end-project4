import { deleteExam } from "../../../lib/exam/api"

const ExamDeleteButton = ({ ExamId,getAllExam }) => {

    const handleDelete = async () => {
        console.log(ExamId)
        await deleteExam(ExamId)
        getAllExam
      window.location.reload()
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default ExamDeleteButton