import React from "react";
import {useNavigate, useLocation } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import "../../index.css";

const FeedbackList = ({ feedbackData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openAddFeedbackModal = () => {
    navigate("/addFeedback", { state: { backgroundLocation: location.pathname } });
  };

  return (
    <div className="container">
      {feedbackData?.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback}/>
      ))}
 <button className="Feedback-btn" onClick={openAddFeedbackModal}>+Feedback </button>
    </div>
  );
};

export default FeedbackList;
