import React, {useState} from 'react';

//img, getPost,
export default function DisplayBox({ getImg, getPost, checkImg, pageNum, index}) {
  const [description, setDesc] = useState("")
  const [author, setAuthor] = useState("")
  const [img, setImg] = useState("")
  const [display, setDisplay] = useState(true)
  const offset = 4 * (pageNum)
  const imgIndex = index + offset
  console.log("curr page num: " + pageNum)
  console.log("checking image: " + imgIndex)
  checkImg(imgIndex).then(res => {
    setDisplay(res)
  })
  if (display) {
    // console.log("DISPLAYING")
    getPost(imgIndex).then(res => { 
      if (res) {
        setDesc(res['description']) 
      setAuthor(res['author'])
      }
      
    })
    getImg(imgIndex).then(res => {
        setImg("https://showcasesite.onrender.com/" + res)
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
