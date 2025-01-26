import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { FaEdit, FaTrash} from 'react-icons/fa'; 
import '../css/MoreButtonModal.css'



const MoreButtonModal = ({id,closeModal}) => {
  const navigate = useNavigate();
  const location = useLocation();


  const openeditFeedbackModal = () => {
    closeModal()
    navigate(`/editFeedback/${id}`, { state: { backgroundLocation: location.pathname } });
  };
  const opendeleteFeedbackModal = () => {
    closeModal()
    navigate(`/deleteFeedback/${id}`, { state: { backgroundLocation: location.pathname } });
  };
  return (
    <div  className="modalstyle" onClick={(e) => e.stopPropagation()} >
     <div className="icon-button" onClick={ openeditFeedbackModal }>
          <FaEdit style={{ color: 'yellow' }}  />
          <span>Edit List</span>
        </div>
        <div className="icon-button"  onClick={ opendeleteFeedbackModal } >
          <FaTrash  style={{ color: 'red' }} />
          <span>Delete List</span>
        </div>
  </div>
  )
}

export default MoreButtonModal