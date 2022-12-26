import React, {useState} from 'react';

//img, getPost,
export default function DisplayBox({ getImg, getPost, checkImg, index}) {
  const [description, setDesc] = useState("")
  const [author, setAuthor] = useState("")
  const [img, setImg] = useState("")
  const [display, setDisplay] = useState(true)
  checkImg(index).then(res => {
    setDisplay(res)
  })
  if (display) {
    console.log("DISPLAYING")
    getPost(index).then(res => { 
      if (res) {
        setDesc(res['description']) 
      setAuthor(res['author'])
      }
      
    })
    getImg(index).then(res => {
        setImg("https://secure-eyrie-17225.herokuapp.com/" + res)
    })
  }
 

  function displayBox() {
    return (
    <div className='displayBoxDisplay'>
        <div><img className='displayBoxImg' src={img} /></div>
        <div className='description'>{description}</div>
        <div>{"Post By: " + author}</div>
    </div>
    )
  }

  function placeholder() {
    return (
      <div className='displayBoxDisplay placeholder'>
        <div><img className='displayBoxImg placeholder'/></div>
        <div className='description'>{}</div>
      </div>
    )
  } 

  if (display) {
    return displayBox()
  }
  return placeholder()
}
