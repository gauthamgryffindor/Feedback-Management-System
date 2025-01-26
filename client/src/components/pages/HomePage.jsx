
import React ,{useEffect, useState}from 'react'
import FeedbackList from '../Feedback/FeedbackList';
import '../../index.css'
import axios from 'axios'
import { useLocation } from "react-router-dom";

const HomePage = () => {

    const [feedbackData, setFeedbackData] = useState([]);
    const location=useLocation()
    const feedbackDatas=async()=>{
      try{
        const response= await axios.get("http://localhost:5000/feedbacks")
        console.log("f",response)
        setFeedbackData(response.data.feedbackdata)
      }catch(e){
        console.log(e)
      }
    }
    useEffect(()=>{
    feedbackDatas()
    },[location])

      return (
        <div className="container">
          <FeedbackList feedbackData={feedbackData}/>
        </div>
      );
  
}

export default HomePage