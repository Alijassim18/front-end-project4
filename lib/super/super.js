import axios from "axios"

const baseUrl = "http://localhost:3000"



const deleteUser=async (id) => {
      try{
        const url=`${baseUrl}/super/${id}`
       const response=await axios.delete(url)
       return response
    }
    catch(err){
        console.log(err)

    }
}


export{
  
    deleteUser
}
