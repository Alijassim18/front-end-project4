import { deleteUser } from "../../../lib/super/super"

const UserDeleteButton = ({ AdminId,getAllUsers }) => {

    const handleDelete = async () => {
        console.log(AdminId)
        await deleteUser(AdminId)
        getAllUsers
                window.location.reload()
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default UserDeleteButton