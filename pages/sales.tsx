import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(
        'https://proton.api.atomicassets.io/atomicmarket/v2/sales?collection_name=protonpups&page=1&limit=100&order=desc&sort=created'
      );
      setAssets(response.data.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  return (
    <div style={{ height: '20rem', width: '100%' }}>
      <div style={{ marginTop: '20rem' }}>this is for sales data</div>
      <h1>Minted and Non-Minted NFTs</h1>
      <button onClick={fetchAssets}>Fetch Assets</button>
      <ul>
        {assets.map((asset) => (
          <li key={asset.asset_id}>
            Asset ID: {asset.asset_id}, Owner:{' '}
            {asset.owner ? asset.owner : 'Not minted yet'}
          </li>
        ))}
      </ul>
    </div>
  );
}
