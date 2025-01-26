import db from '../modal/index.js'
import { logActivity } from '../middleware/loggingActivity.js'

const getAllFeedback=(req,res)=>{
    const query = `SELECT * FROM feedbacks `;
    db.query(query, (err, result) => {

        if (err) {

            console.error("Error get all feedback:", err);
           
            res.status(500).json({ message: "Failed to get all feedback." });
            return logActivity('ERROR:Getting all the Feedbacks',`error occured while getting the data from the table ${err.message}`)
        }
        res.status(201).send({
            message: "Feedback added successfully!",
            feedbackdata:result
    })
    logActivity('Getting all the Feedbacks',"successfully got all the feedbacks from the table")
});
}

const getFeedbackById=(req,res)=>{
    const feedbackId = req.params.id;
    if (!feedbackId || isNaN(feedbackId)) {
        res.status(400).json({ message: "Invalid feedback ID." });
       return logActivity("ERROR: invalid feedback id",`the feedback id from the request params is not correct ${feedbackId}`)
    }
    const query = `SELECT * FROM feedbacks WHERE id = ?`;
    db.query(query, [feedbackId], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).json({ message: "Database query error." });
            return logActivity('ERROR:Getting the Feedbacks by id',`error occured while getting the data from the table ${err.message}`)
        }
        if (result.length === 0) { 
            res.status(404).json({ message: "Feedback not found." });
            return logActivity('ERROR:Getting the Feedbacks by id ',"feedback was not founded")
        }
        res.status(200).json({
            message: "Feedback fetched successfully.",
            feedback: result[0]
        });
        logActivity('SUCCESS:Getting the Feedbacks by id ',"successfully got the feedback from the table")
    });
}

const addFeedback=(req,res)=>{
    const { title, platform, module, description, attachments, tags} = req.body;

    const query = `
        INSERT INTO feedbacks (title, platform, module, description, attachments, tags, votes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title,
        platform,
        module || "Miscellaneous", 
        description,
        attachments || "No Attachment",
        tags,
        0
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error("Error inserting feedback:", err);
            
             res.status(500).json({ message: "Failed to add feedback." });
            return  logActivity('ERROR:insertingthe Feedbacks ',`error occured while insering the feedback into the table ${err.message}`)
        } 
        res.status(201).json({
            message: "Feedback added successfully.",
            feedbackId: result.insertId, 
        });
        logActivity('SUCCESS:inserted the Feedback ',"successfully added the feedback into the table")
    }); 
}

const editFeedback=(req,res)=>{
    const feedbackId = req.params.id;
    const { title, platform, module, description, attachments, tags } = req.body;

    if (!feedbackId || isNaN(feedbackId)) {
        res.status(400).json({ message: "Invalid feedback ID." });
        return logActivity("ERROR: invalid feedback id",`the feedback id from the request params is not correct ${feedbackId}`)
    }
    const query = `
    UPDATE feedbacks 
    SET 
        title = ?, 
        platform = ?, 
        module = ?, 
        description = ?, 
        attachments = ?, 
        tags = ?, 
        votes = ?
    WHERE id = ?
`;
const values = [
    title,
    platform ,
    module || "Miscellaneous",
    description,
    attachments || "No Attachment",
    tags ,
     0,
    feedbackId,
];
db.query(query, values, (err, result) => {
    if (err) {
        console.error("Error updating feedback:", err);
        res.status(500).json({ message: "Failed to update feedback." });
        return logActivity("ERROR: updating the feedback",`error occured while updating the feedback ${err.message}`)
    }

    if (result.affectedRows === 0) {
       
        res.status(404).json({ message: "Feedback not found." });
        return logActivity("ERROR: updating the feedback",`Feedback was not founded ${feedbackId}`)
    }
    res.status(200).json({
        message: "Feedback updated successfully.",
    });
    logActivity("SUCCESS: updating the feedback",`Successfully the feedback is updated`)
});
}

const deleteFeedback=(req,res)=>{
    const feedbackId = req.params.id;
    if (!feedbackId || isNaN(feedbackId)) {
        res.status(400).json({ message: "Invalid feedback ID." });
        return logActivity("ERROR: invalid feedback id",`the feedback id from the request params is not correct ${feedbackId}`)
    }
    const query = `DELETE FROM feedbacks WHERE id = ?`;
    db.query(query, [feedbackId], (err, result) => {
        if (err) {
            console.error("Error deleting feedback:", err);
            res.status(500).json({ message: "Failed to delete feedback." });
            return logActivity("ERROR: Deleting Feedback",`error occured from deleting the feedback${err.message}`)
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Feedback not found." });
            return logActivity("ERROR: deleting feedback ",`the feedback id is not found from the request params is not correct ${feedbackId}`)

        }

        res.status(200).json({
            message: "Feedback deleted successfully.",
        });
        logActivity("SUCCESS: Deleted the feedback","Successfully deleted the feedback")
    });
}

export default {getAllFeedback,getFeedbackById,addFeedback,editFeedback,deleteFeedback}