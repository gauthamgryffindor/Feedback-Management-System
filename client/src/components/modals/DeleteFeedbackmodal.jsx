import React from 'react'
import '../css/DeleteFeedbackModal.css'
import ModalWrapper from '../abstraction/ModalWrapper'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
const DeleteFeedbackmodal = () => {
  const navigate = useNavigate();
  const{id}=useParams()
  const closeModal = () => {
      navigate(-1); 
  };
  const deleteFeedback=async()=>{
    if(id){
      const res=await axios.delete(`http://localhost:5000/feedbacks/${id}`)
      console.log("deletemessage",res)
      closeModal()
  }
}
  
  return (
    <ModalWrapper closeModal={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Delete Feedback</h2>
        <p>Are you sure you want to delete this feedback?</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={closeModal}>Cancel</button>
          <button className="submit-btn" onClick={deleteFeedback}>Submit</button>
        </div>
      </div>
      </ModalWrapper>
  )
}

export default DeleteFeedbackmodal