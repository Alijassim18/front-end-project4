import NavBarSuper from "./navBarSuper"

const MainPages = () => {
  const name = localStorage.getItem("name") 

  return (
    <>
      <NavBarSuper />
      <h1>Welcome Back Supervisor {name}!</h1>
    </>
  )
}

export default MainPages