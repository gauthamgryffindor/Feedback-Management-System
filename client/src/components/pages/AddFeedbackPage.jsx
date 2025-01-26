
import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import ModalWrapper from "../abstraction/ModalWrapper";
import Smallcard from "../abstraction/smallcard";
import '../css/addFeedbackModal.css'
import axios from 'axios'



const AddFeedbackPage = () => {
  const navigate = useNavigate();
  const{id}=useParams()
    const closeModal = () => {
      navigate(-1); 
    };
  const[checked,setChecked]=useState("")
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    module: "",
    description: "",
    attachments: "",
    tags: "",
  });

  useEffect(()=>{
    const getdatabyid=async()=>{
      if(id){
        const res=await axios.get(`http://localhost:5000/feedbacks/${id}`)
        setFormData({
          title: res.data.feedback.title,
          platform: res.data.feedback.platform,
          module: res.data.feedback.module,
          description: res.data.feedback.description,
          attachments: res.data.feedback.attachments||"",
          tags: res.data.feedback.tags,
        })
      }
    }
   getdatabyid()
  },[id])
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="tags") setChecked(value)
    setFormData({ ...formData,[name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(id){
      try{
        const res=await axios.put(`http://localhost:5000/feedbacks/${id}`,formData)
       console.log(res)
     }catch(e){
     console.log(e)
     }
    }else{
    try{
     const res=await axios.post("http://localhost:5000/feedbacks",formData)
    console.log(res)
  }catch(e){
  console.log(e)
  }
    }
    setFormData({
      title: "",
      platform: "",
      module: "",
      description: "",
      attachments: "",
      tags: "",
    })
    navigate(-1); 
  };
 
  const tagsArr=["feedback","Bug","Idea","Feature"]
  const color=["purple","red","yellow","blue","green"]
  return (
    <ModalWrapper closeModal={closeModal}>
    <div className="container1" onClick={(e)=>e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        <div>
      <h4>Bug Report</h4>
      </div>
      <label>title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label>Platform</label>
        <select name="platform" id="platform" placeholder="platform" onChange={e=>handleChange(e)} value={formData.platform} required>
        <option value="" disabled selected>select the platform</option>
           <option value="Android">Android</option>
           <option value="ios">ios</option>
           <option value="Web">Web</option>
        </select>
        <label>module</label>
        <select name="module" id="module"  placeholder="module"onChange={e=>handleChange(e)} value={formData.module} required>
           <option value=""disabled selected>select the module</option>
           <option value="Channel">Channel</option>
           <option value="Project">Project</option>
           <option value="Tasks">Tasks</option>
           <option value="Chat">Chat</option>
           <option value="Alert">Alert</option>
        </select>
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          required
        ></textarea>
      <label>Attachments</label>
        <input
          type="file"
          name="attachments"
          onChange={(e) =>
            setFormData({ ...formData, attachments: e.target.files[0].name })
          }
        />
        <label>Tags</label>
        <div className="footer">
           { tagsArr.map((value,key)=>{
            return <Smallcard 
            radio
            key={key}
            name="tags" 
            value={value}
            checked={checked===value}
            handleChange={handleChange}
            color={color[key]}
           />
            })}
 
      </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
    </ModalWrapper>
  );
};

export default AddFeedbackPage;
