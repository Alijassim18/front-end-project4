import { useState } from 'react'
import { useNavigate } from 'react-router'
import NavBarSuper from './navBarSuper'
import axios from 'axios'

function SignUp() {
    const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/super/register-student', {
        name,
        email,
        password
      })
      navigate('super-addStudent')
    } catch (err) {
     return err
    }
  }

  return (
    <>
 <NavBarSuper/>
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>

      <input 
        placeholder="Email"
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />

      <input 
        placeholder="Name"
        value={name}
        onChange={event => setName(event.target.value)}
      />


      <input 
        placeholder="Password"
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />

      <button type="submit">Add</button>
    </form></>
  )
}

export default SignUp
