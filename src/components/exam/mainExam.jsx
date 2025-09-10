import NavBarExam from "./NavBarExam"
const MainPagesExam = () => {
      const name = localStorage.getItem("name") 
return(
    <>
        <NavBarExam/>
        <h1>Welcome back  {name}!</h1>
    </>
)
}

export default MainPagesExam