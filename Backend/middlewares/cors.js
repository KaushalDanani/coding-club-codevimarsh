const cors = require('cors');

const corsOptions = {
    origin: `${process.env.REACT_APP_FRONTEND_URL}`, // Replace with your React app's origin
    optionsSuccessStatus: 200,
    credentials: true
};

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with the origin of your client-side app
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
//   });

module.exports = cors(corsOptions);