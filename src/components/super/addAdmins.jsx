import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import NavBarSuper from './navBarSuper'
import './addAdmin.css'  

function SignUpAdmins() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/super/register-admin', {
        name,
        email,
        password
      })
 window.location.reload();
    } catch (err) {
    return err
    }
  }

  return (
    <>
      <NavBarSuper />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-title">Add Admin</h2>

          <input
            className="signup-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <input
            className="signup-input"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <input
            className="signup-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <button className="signup-button" type="submit">Add</button>
        </form>
      </div>
    </>
  )
}

export default SignUpAdmins
