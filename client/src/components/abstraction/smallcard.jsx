import React from 'react'
import '../css/smallCard.css'
const Smallcard = ({value,name,checked,handleChange,radio,color}) => {
  return (
<div className="footer-box module-box"
 style={{border:` 2px solid ${color}`,color:checked ?"white":color,
         backgroundColor: checked ? color : "inherit", // Dynamic background color
        transition: "background-color 0.3s ease"}}
        >
{radio&&<input 
        type="radio" 
        name={name} 
        value={value} 
        checked={checked} 
        onChange={e=>handleChange(e)} 
        className="custom-radio" 
      />}
    <span className="footer-value">{value}</span>
  </div>
  )
}

export default Smallcard