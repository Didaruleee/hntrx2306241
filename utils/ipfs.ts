import axios from 'axios';

async function fetchDataFromIPFS(ipfsUrl) {
  try {
    // Fetch the data from IPFS using Axios
    const response = await axios.get(ipfsUrl, { responseType: 'arraybuffer' });

    // Convert the array buffer response to a base64 encoded string
    const data = Buffer.from(response.data, 'binary').toString('base64');

    // Create a data URL based on the content type
    const contentType = response.headers['content-type'];
    const dataUrl = `data:${contentType};base64,${data}`;

    return dataUrl;
  } catch (error) {
    console.error('Error fetching data from IPFS:', error);
    throw error;
  }
}
export { fetchDataFromIPFS };
