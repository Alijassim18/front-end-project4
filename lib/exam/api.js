import axios from "axios"

const baseUrl = "http://localhost:3000"
const createNewExam =async (data) =>{
    try{
        const url=`${baseUrl}/exam/new`
       const response=await axios.post(url,data)
       return response
    }
    catch(err){
return err
    }
}
const deleteExam=async (id) => {
      try{
        const url=`${baseUrl}/exam/${id}`
       const response=await axios.delete(url)
       return response
    }
    catch(err){
return err
    }
}
const ListAllExam=async () => {
      try{
        const url=`${baseUrl}/exam/`
        console.log(url)
       const response=await axios.get(url)
       console.log(response)
       return response.data
    }
    catch(err){
return err
    }
}
const UpdateExam=async (id, data)=>{
      try{
        const url=`${baseUrl}/exam/${id}`
       const response=await axios.put(url, data)
       return response
    }
    catch(err){
return err
    }
}

export{
    createNewExam,
    deleteExam,
    ListAllExam,
    UpdateExam
}