import React from 'react'
import loading from '../../assets/icons/loading.gif'
import '../styles/loading.scss'
function Loading() {
  return (
    <div className="loading-container">
      <img 
        src={loading} 
        alt="Loading..." 
        className="loading-container__image" 
      />
      <span className="loading-container__text">Loading...</span>
    </div>
  )
}

export default Loading