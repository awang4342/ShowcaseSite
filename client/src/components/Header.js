import '../App.css'
import logo from '../images/Logo.png'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import axios from 'axios'
import FlashMessage from 'react-flash-message'
import { useMediaQuery } from 'react-responsive'

const Header = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(true);
  let [searchParams] = useSearchParams();
  const errorMessage = searchParams.get("error")

  //get username from session cookie
  async function getUsername() {
    await axios('http://localhost:3001/get-user', {
      method: "POST",
      withCredentials: true
    }).then(res => {
      const data = res.data
      console.log(data)
      setUsername(data)
      setLoading(false)
    })
  }

  //run get username when page loads
  useEffect(() => {
    getUsername();
  }, []);

  function CheckUsername() {
    if (isLoading || username == "") {
      return <div></div>
    }
    return (
    <>
      <div className='loggedInUI'>
        <div className='nameDisplay'>Logged in as: {username}</div>
        <form action='http://localhost:3001/logout' method="POST">
          <button className='logoutButton' input="submit">Logout</button>
        </form>
        </div>
    </>
    )
  }


  //Double click logo nagigates to login/submit if authenticated
  var timer = 0;
  const navigate = useNavigate();
  const accessLogin = async () => {
    var currTime = new Date().getTime()/1000;
    if (currTime - timer <= 1) {
      await axios('http://localhost:3001/get-auth', {
        method: "POST",
        withCredentials: true
      }).then(res => {
        const data = res.data
        console.log("IN THEN")
        if (data) {
          navigate('/submit')
        } else {
          navigate('/login')
        }
      })
      timer = 0
    } else {
      console.log("")
      timer = new Date().getTime()/1000;
    }
  }


  function Form() {
    return (
      <>
      <div className='header'>
              <img className="logo" onClick={accessLogin} src={logo}/>
              <div className='topbarColumn'>
                <div className='links'>
                  <Link to="/">Home</Link>
                  <Link to="/aboutme">About Me</Link>
                </div>
                <CheckUsername />
              </div>
              
          </div>
          <FlashMessage duration={5000}>
            <strong>{errorMessage}</strong>
          </FlashMessage>
      </>
    
    )
  }
  function Form2() {
    return (
      <>
      <div className='header'>
              <img className="logo2" onClick={accessLogin} src={logo}/>
              <div className='topbarColumn'>
                <div className='links2'>
                  <Link to="/">Home</Link>
                  <Link to="/aboutme">About Me</Link>
                </div>
                <CheckUsername />
              </div>
              
          </div>
          <FlashMessage duration={5000}>
            <strong>{errorMessage}</strong>
          </FlashMessage>
      </>
    
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
         <IsBig><Components.Default /></IsBig>
      <IsSmall><Components.Columned /></IsSmall>
      </>
  );
}

export default Header;