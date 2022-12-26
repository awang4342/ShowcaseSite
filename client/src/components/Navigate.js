import React, { useState } from 'react'
import axios from 'axios'

export default function Navigate({ page, setPage }) {
  const [imageCount, setCount] = useState(0)

  const sendAPI = () => {
    axios.post('http://localhost:3001/img-count')
    .then(res => {
      const info = res.data
      setCount(info)
    })
  }

  sendAPI()

  const itemsPerPage = 4;
  const numbOfBtns = 5;

  const calcMaxPages = () => {
    return Math.ceil(imageCount/itemsPerPage)
  }

  const checkPages = (currPage) => {
    const maxPages = Math.floor(imageCount/itemsPerPage)
    // console.log(imageCount)
    if (currPage <= maxPages) {
      return true
    }
    return false
  }

  const calcPageNumber = (increment) => {
    return Math.floor(page/numbOfBtns)*numbOfBtns + increment
  }

  const changePage = (increment) => {
    const pageNumb = calcPageNumber(increment)
    setPage(pageNumb)
  }

  return (
    <>
        <div className="navigateMain">
            { checkPages(0) ? <button className='navigateBtn' onClick={() => {changePage(0)} }>{ calcPageNumber(1) }</button> : null }
            { checkPages(1) ? <button className='navigateBtn' onClick={() => {changePage(1)}}>{ calcPageNumber(2) }</button> : null }
            { checkPages(2) ? <button className='navigateBtn' onClick={() => {changePage(2)}}>{ calcPageNumber(3) }</button> : null }
            { checkPages(3) ? <button className='navigateBtn' onClick={() => {changePage(3)}}>{ calcPageNumber(4) }</button> : null }
            { checkPages(4) ? <button className='navigateBtn' onClick={() => {changePage(4)}}>{ calcPageNumber(5) }</button> : null }
            { checkPages(5) ? <div className='navigateBtn'>. . .</div> : null }
            { checkPages(5) ? <button className='navigateBtn' onClick={() => { this.props.changePage(calcMaxPages()%5) }}>{calcMaxPages()}</button> : null }  
        </div>
    </>
  )
}