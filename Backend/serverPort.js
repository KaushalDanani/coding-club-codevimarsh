const app = require('./index');
const PORT = process.env.REACT_APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});