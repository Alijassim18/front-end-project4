import { deleteUser } from "../../../lib/super/super"
import './deletebtn.css'; 
const UserDeleteButton = ({ AdminId,getAllUsers }) => {

    const handleDelete = async () => {
        console.log(AdminId)
        await deleteUser(AdminId)
        getAllUsers
                window.location.reload()
    }
    return (
        <button onClick={handleDelete} className="btn">Delete</button>
    )
}

export default UserDeleteButton