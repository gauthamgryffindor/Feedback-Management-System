import db from '../modal/index.js'
export const logActivity=(activityType, description)=> {
  const query = 'INSERT INTO activity_logs (activity , description) VALUES (?, ?)';
  const values = [activityType, description];
  
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error logging activity:', err);
    } else {
      console.log('Activity logged successfully');
    }
  });
  db.query('select * from activity_logs', (err, results) => {
    if (err) {
      console.error('Error logging activity:', err);
    } else {
      console.log('Activity logged successfully',results);
    }
  });
// const query1=`CREATE TABLE api_tracking (id INT AUTO_INCREMENT PRIMARY KEY,api_endpoint VARCHAR(255) NOT NULL,request_data TEXT,response_data TEXT,status_code INT,response_time INT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
//   db.query(query1, (err, results) => {
//     if (err) {
//       console.error('Error logging activity:', err);
//     } else {
//       console.log('Activity logged table successfully');
//     }
//   });

}