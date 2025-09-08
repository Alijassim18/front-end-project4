import {  useEffect,useState } from "react";
import { ClipLoader } from "react-spinners"
import UserDeleteButton from "./deleteBtn";
import axios from "axios"
import NavBarSuper from "./navBarSuper";
const baseUrl = "http://localhost:3000"
const UserList=()=>{
    const [user,setUser]=useState([])

     const getAllUser = async () => {

        try {
            const url = `${baseUrl}/super/all-user`
            const response = await axios.get(url)
            console.log('this is the API response', response)
            setUser(response.data)
            return response
            
        } catch (error) {
            console.log('error: ', error)
        }
    }

        useEffect(() => {
        getAllUser()
    }, []) 

      return (
        <div>
            <NavBarSuper/>
        
            <ol>
                
                {
                    user.length
                        ?
                        user.map((oneUser, i) => {
                            return(
                            <>
                            <p key={i}>{oneUser.name}</p>
                            <p key={i}>{oneUser.email}</p>
                            <p key={i}>{oneUser.role}</p>
                            <UserDeleteButton AdminId={oneUser._id}
                            getAllUsers={getAllUser}
                            />
                            
                            </>
                            
                            )
                        }) :
                        <ClipLoader color="#FF00FF" />

                }
            </ol>
        </div>
    ) 
}
export default UserList