import { useEffect } from 'react'
import '../App.css';
import { useMediaQuery } from 'react-responsive';
import DisplayBox from './DisplayBox';
import Placeholder from './Placeholder';
import axios from 'axios';

export default function Display({ page }) {
  const cache = {}
  const itemsPerPage = 4;

  //Gets Images then saves to cache
  // function importAll(r) {
  //   r.keys().forEach((key) => {
  //     cache[key] = r(key)
  //   });
  // }
  // importAll(require.context('../.././public/uploads', false, /\.(png|jpe?g|svg)$/i));

  //Turns cache from Object to Array
  // async function getImages() {
  //   var data
  //   await axios.post('http://localhost:3001/get-images')
  //   .then(res => {
  //     console.log(res.data)
  //     data = res.data.length
  //     console.log(data.length + " I HAVE THIS MANY IMAGES")
  //   })
  //   console.log("returning " + data)
  //   return data
  // }

  // Gets image at index
  async function getImage(i) {
    var val
    await axios.post('http://localhost:3001/get-images?index=' + i)
    .then(res => {
      val = res.data
    })
    // console.log("IMAGE VALUE ISSSSSSSSS: " + val)
    return val
  }
 
  //Gets post at index 
  async function getPost(i) {
    var path = getImage(i)
    await axios.post('http://localhost:3001/get-images?index=' + i)
    .then(res => {
      path = res.data
    })
    const name = path.substring(path.lastIndexOf("/") + 1, path.length) 
    // console.log("FULL NAME: " + fullName)
    // const splitString = fullName.split(".")
    // const parsedName = splitString[0] + "." + splitString[2]
    var post
    // console.log("USERNAME: " + name)
    await axios.post('http://localhost:3001/get-post?imgName=' + name)
    .then(res => {
      post = res.data;
    })  
    // console.log("POST DATA IS " + post)
    return post
  }
  

  // function displayBoxWrapper(i) {
  //   return <div>{checkImage(i) ? <DisplayBox img={getImage(i)} getPost={getPost} index={i} /> : <Placeholder />}</div>
  // }

  

  function test() {
    return false
  }

  //Checks if there is an image at index
  async function checkImage(i) {
    var val
    await axios.post('http://localhost:3001/get-images?index=' + i)
    .then(res => {
      // console.log("IMAGE DATA IS: "  + res.data)
      val = res.data
    })
    if (val == "") {
      console.log("not displaying image: " + i)
      return false
    }
    return true
  }

  // function displayBoxWrapper(i) {
  //   return <div>{checkImage() ? <DisplayBox getImg={getImage} getPost={getPost} index={i} /> : <Placeholder />}</div>
  // }
  function displayBoxWrapper(i) {
    return <div>{<DisplayBox getImg={getImage} getPost={getPost} checkImg={checkImage} index={i} />}</div>
  }

  const Components = {
    InRow: function InRow() {
      return (
        <div className='row'>
          <div className='column'>
            {displayBoxWrapper(1)}
            {displayBoxWrapper(2)}
          </div>
          <div className='column'>
            {displayBoxWrapper(3)}
            {displayBoxWrapper(4)}
          </div>
        </div>
      );
    },
    InColumn: function InRow() {
      return (
          <div className='column'>
            {displayBoxWrapper(1)}
            {displayBoxWrapper(2)}
            {displayBoxWrapper(3)}
            {displayBoxWrapper(4)}
          </div>
      );
    }
  }
  const IsSmall = ({ children }) => {
    const small = useMediaQuery({ maxWidth: 992 })
    return small ? children : null
  }
  const IsBig = ({ children }) => {
    const big = useMediaQuery({ minWidth: 992 })
    return big ? children : null
  }

  return (
    <> 
      <IsSmall><Components.InColumn /></IsSmall>
      <IsBig><Components.InRow /></IsBig>
    </>
  );
}



