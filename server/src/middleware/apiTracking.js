import db from '../modal/index.js'


const apiTracking=(req, res, next) => {
    console.log("=============>11")
        const startTime = Date.now(); 
        const originalSend = res.send;
       
        let statusCode = res.statusCode; 
        Object.defineProperty(res, 'statusCode', {
            get: () => statusCode,
            set: (value) => {
              statusCode = value;  // Update statusCode whenever it's set
            }
          });
        console.log("ajhjahjah",originalSend,statusCode)
        res.send = function (body) {
            console.log("=============>12")
          const responseTime = Date.now() - startTime; 
          const query = `
            INSERT INTO api_tracking (api_endpoint, request_data, response_data, status_code, response_time)
            VALUES (?, ?, ?, ?, ?)
          `;
          const requestData = JSON.stringify(req.body);
          const responseData = JSON.stringify(body);
          const values = [req.originalUrl, requestData, responseData, statusCode, responseTime];
      
          db.query(query, values, (err, results) => {
            if (err) {
              console.error('Error logging API request:', err);
            } else {
              console.log('API request logged successfully');
            }
          });
//             db.query('select * from api_tracking', (err, results) => {
//     if (err) {
//       console.error('Error logging activity:', err);
//     } else {
//       console.log('Activity logged successfully',results[5]);
//     }
//   });
console.log("=============>13")
          originalSend.call(res, body);
          next(); 
        };
        console.log("=============>14")
        next();
      }

export default apiTracking;