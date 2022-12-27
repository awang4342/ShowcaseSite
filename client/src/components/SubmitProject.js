import React from 'react'



export default function SubmitProject() {

  // const [username, setUsername] = useState("");
  // const [isLoading, setLoading] = useState(true);

  // async function getUsername() {
  //   await axios('https://showcasesite.onrender.com/get-user', {
  //     method: "POST",
  //     withCredentials: true
  //   }).then(res => {
  //     const data = res.data
  //     setUsername(data)
  //     setLoading(false)
  //   })
  // }

  return (
    <>
      <form className='submit-proj' action='https://showcasesite.onrender.com/submit' method="POST" encType='multipart/form-data'>
        <div className='formBackground'>
          <div className='formColumn'>
            <label>Description:</label>
            <textarea className='proj-desc' type="text" name='description' rows="5" cols="50" maxLength={500} required></textarea>
          </div>
          <input className='proj-img' type="file"  name="img" accept="image/*"></input>
          <div className='formColumn'>
            <button className='formButton' input="submit">Submit</button>
          </div>
          
        </div>        
      </form>
    </>
  )
}
