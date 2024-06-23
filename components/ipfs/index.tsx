import { useEffect, useState } from 'react';
import { fetchDataFromIPFS } from '../../utils/ipfs'; // Path to your utility function

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyComponent() {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        const ipfsUrl =
          'ipfs://<QmYyFjkivocf5C5a6G7kUMvrnXdFxPpWz71N72XjVnyLzQ>'; // Replace <YOUR_IPFS_CID> with the CID of your image or video
        const imageUrl = await fetchDataFromIPFS(ipfsUrl);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchImage();
  }, []);

  // eslint-disable-next-line jsx-a11y/img-redundant-alt
  return <div>{imageSrc && <img src={imageSrc} alt="IPFS Image" />}</div>;
}

export default MyComponent;
