import axios from "axios"

const baseUrl = "http://localhost:3000"

const ListAllAdmins=async () => {
      try{
        const url=`${baseUrl}/super/admins`
        console.log(url)
       const response=await axios.get(url)
       console.log(response)
       return response.data
    }
    catch(err){
return err
    }
}

const ListAllStudent=async () => {
      try{
        const url=`${baseUrl}/super/student`
        console.log(url)
       const response=await axios.get(url)
       console.log(response)
       return response.data
    }
    catch(err){
return err
    }
}


export{
    ListAllAdmins,
    ListAllStudent
}
