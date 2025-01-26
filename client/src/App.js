import React from "react";
import {  Routes, Route,Navigate,useLocation} from 'react-router-dom';
import HomePage from "./components/pages/HomePage";
import AddFeedbackPage from "./components/pages/AddFeedbackPage";
import DeleteFeedbackmodal from "./components/modals/DeleteFeedbackmodal";


const App = () => {
  const location = useLocation();
  const state = location.state || {};
  console.log(location,state.backgroundLocation)
  return(
<>
    <Routes location={state.backgroundLocation || location} >
      <Route path="/" element={<HomePage/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {state.backgroundLocation && ( <Routes>
      <Route path="/addFeedback" element={<AddFeedbackPage/>}/>
      <Route path="/editFeedback/:id" element={<AddFeedbackPage/>}/>
      <Route path="/deleteFeedback/:id" element={<DeleteFeedbackmodal/>}/>
    </Routes>
    
  )}
  </>
  )
};

export default App;

