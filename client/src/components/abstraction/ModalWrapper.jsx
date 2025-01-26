import React from 'react'
const myStyle={
    position:"fixed",
    top:0,
    left: 0,
    width: "100%",
    height: "100%",
    background:"#0000004D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "10",
    
  }

const ModalWrapper = ({closeModal,children}) => {
  return (
    <div id="modalWrapper" style={myStyle} onClick={()=>closeModal()} >
        {children}
    </div>
  )
}

export default ModalWrapper