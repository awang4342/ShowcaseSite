import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'

export default function SignUp() {
  const navigate = useNavigate()
  async function checkNotAuthenticated() {
    await axios('https://showcasesite.onrender.com/get-auth', {
      method: "POST",
      withCredentials: true
    }).then(res => {
      const data = res.data
      if (data) {
        navigate('/')
      }
    }) 
  }

  useEffect(() => {
    checkNotAuthenticated()
  })

  function Form() {
    return  (
    <form className="form" action='https://showcasesite.onrender.com/verification' method="POST">
        <div className='formBackground'>
          <div className='formColumn'>
            <label>Verification Code:</label>
            <input className='formInput' name='code' type="password" required></input><br></br>
          </div>
          <div className='formColumn'>
            <button className='formButton' input="submit">Submit</button>
          </div>
          <Link className='linkBtn' to="/login">Login Instead</Link>
        </div>
    </form>
    )
  }

  function Form2() {
    return  (
      <form className="form" action='https://showcasesite.onrender.com/verification' method="POST">
      <div className='formBackground-2'>
        <div className='formColumn'>
        <label>Verification Code:</label>
        </div>
        <div className='formColumn'>
          
          <input className='formInput' name='code' type="password" required></input><br></br>
        </div>
        <div className='formColumn'>
          <button className='formButton' input="submit">Submit</button>
        </div>
        <Link className='linkBtn' to="/login">Login Instead</Link>
      </div>
  </form>
    )
  }

  const Components = {
    Default: () => {
        return Form();
    },
    Columned: () => {
        return Form2();
    }
}

const IsSmall = ({ children }) => {
  const small = useMediaQuery({ maxWidth: 1050 })
  return small ? children : null
}
const IsBig = ({ children }) => {
  const big = useMediaQuery({ minWidth: 1050 })
  return big ? children : null
}

  return (
    <>  
            <IsSmall><Components.Columned /></IsSmall>
            <IsBig><Components.Default /></IsBig>
        </>
  )
}
