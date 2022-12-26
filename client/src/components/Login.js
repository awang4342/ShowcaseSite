
import React, { useEffect } from 'react'
import axios from 'axios'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  async function checkNotAuthenticated() {
    await axios('https://secure-eyrie-17225.herokuapp.com/get-auth', {
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

  const Components = {
    Default: () => {
      return (
        <>
        <form className="form" action='https://secure-eyrie-17225.herokuapp.com/login' method="POST">
        <div className='formBackground'>
          <div className='formColumn'>
            <label>Username:</label>
            <input className='formInput' name='username' type="text" required /><br/>
          </div>
          <div className='formColumn'>
            <label>Password:</label>
            <input className='formInput' name='password' type="password" required /><br/>
          </div>
          <div className='formColumn'>
            <button className='formButton' input="submit">Submit</button>
          </div>
          <Link className='linkBtn' to="/verification">Create an Account Instead</Link>
        </div>
      </form>
        </>
      );
    },
    Columned: () => {
      return (
          <>
          <form className="form" action='https://secure-eyrie-17225.herokuapp.com/login' method="POST">
        <div className='formBackground-2'>

            <div className='formColumn'>
            <div>Username</div>
            </div>
            <div className='formColumn'>
            <input className='formInput' name='username' type="text" required /><br/>
            </div>
            <div className='formColumn'>
            <label>Password:</label>
            </div>
            <div className='formColumn'>
            <input className='formInput' name='password' type="password" required /><br/>
            </div>
            
       
          <div className='formColumn'>
            <button className='formButton' input="submit">Submit</button>
          </div>
          <Link className='linkBtn' to="/verification">Create an Account Instead</Link>
        </div>
      </form>
          </>
      );
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
      <IsBig><Components.Default /></IsBig>
      <IsSmall><Components.Columned /></IsSmall>
    </>
  );
}