import axios from 'axios';
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useSearchParams, useNavigate } from "react-router-dom";

export default function CreateAccount() {
    const [verifCode] = useSearchParams()
    const code = verifCode.get("code")
    const navigate = useNavigate()

    useEffect(async () => {
        await axios.post(this.context + "/checkCode?code=" + code)
        .then(res => {
            const data = res.data
            if (data === false) {
                console.log("False")
                navigate('/')
            }
        })
    })
    function Form() {
        return (
        <form className="form" action='https://showcasesite.onrender.com/createAccount' method="POST">
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
                <label>Confirm Password:</label>
            <input className='formInput' name='confirmpass' type="password" required /><br/>
                </div>
                <div className='formColumn'>
                <input type="hidden" name="verifCode" value={code || ""} />
            <button className='formButton' input="submit">Submit</button>
                </div>
            </div>
        </form>
        )
    }

    function Form2() {
        return (
        <form className="form" action='https://showcasesite.onrender.com/createAccount' method="POST">
            <div className='formBackground-2'>

                
                <div className='formColumn'>
                <label>Username:</label>
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
                <label>Confirm Password:</label>
                </div>
                <div className='formColumn'>
                
            <input className='formInput' name='confirmpass' type="password" required /><br/>
                </div>
                <div className='formColumn'>
                <input type="hidden" name="verifCode" value={code || ""} />
            <button className='formButton' input="submit">Submit</button>
                </div>
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
