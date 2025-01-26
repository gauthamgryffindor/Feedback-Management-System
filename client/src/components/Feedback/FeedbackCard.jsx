import React ,{useState}from "react";

import "../css/FeedbackCard.css";
import ModalWrapper from "../abstraction/ModalWrapper.jsx";
import {FaArrowUp} from 'react-icons/fa';  
import Smallcard from "../abstraction/smallcard.jsx";
import MoreButtonModal from "../modals/MoreButtonModal.jsx";
import DeleteFeedbackmodal from "../modals/DeleteFeedbackmodal.jsx";
import { useNavigate } from "react-router-dom";

const FeedbackCard = ({ feedback }) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
      setShowMenu((prev) => !prev);
    };
    const closeModal = () => {
      setShowMenu(false);
      navigate(-1); 
    };
  
  return (
    <div className="card">
      <div className="title-wrapper">
      <h3 className="card-title">{feedback.title}</h3>
      <div class="three-dots" onClick={toggleMenu }>
        <span></span>
        <span></span>
        <span></span>
       </div>
      </div>
        {showMenu && (
       <ModalWrapper  closeModal={closeModal}>
        <MoreButtonModal id={feedback.id} closeModal={closeModal}/>
         {/* <DeleteFeedbackmodal/> */}
         </ModalWrapper>
        )}
      <div className="description-wrapper">
      <p className="card-description">{feedback.description}</p>
      <div className="vote-box">
      <FaArrowUp style={{color:'orange'}}/>
      <span style={{color:"white",fontSize:"1rem"}}>{`Votes${feedback.votes}`}</span>
      </div>
      </div>
       <div className="footer">
            <Smallcard value={"suresh kumar"} color={"orange"}/>
            <Smallcard value={"In-Progress"} color={"blue"}/>
            <Smallcard value={feedback.platform} color={"purple"}/>
            <Smallcard value={feedback.module} color={"red"}/>
            <Smallcard value={feedback.tags} color={"yellow"}/>
      </div>
    </div>
  );
};

export default FeedbackCard;
