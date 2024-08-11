const axios = require('axios');

const urlToBase64 = async function(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        return base64Image;
    } catch (error) {
        console.error('Error fetching the image:', error);
        return null;
    }
}

module.exports = urlToBase64;