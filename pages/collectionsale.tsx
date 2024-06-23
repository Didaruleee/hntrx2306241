import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CollectionData {
  holders: number;
  assets: number;
}

interface UserData {
  name: string;
  profilePicture: string | null;
  img: string | null;
  numNFTs: number;
}

const CollectionInfo = () => {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const { data } = await axios.get<CollectionData>(
          `https://proton.api.atomicassets.io/atomicassets/v1/collections/tokenteddys`
        );
        setCollectionData(data);
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<{ data: any[] }>(
          `https://proton.api.atomicassets.io/atomicassets/v1/assets?collection_name=tokenteddys&limit=1000`
        );
        const users: { [key: string]: UserData } = {};
        data.data.forEach((asset: any) => {
          const owner = asset.owner;
          if (!users[owner]) {
            users[owner] = {
              name: owner,
              profilePicture: null,
              numNFTs: 0,
              img: null,
            };
          }
          users[owner].numNFTs++;
        });
        const sortedUsers = Object.values(users).sort(
          (a, b) => b.numNFTs - a.numNFTs
        );
        setUserData(sortedUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCollectionData();
    fetchUserData();
  }, []);

  return (
    <div style={{ marginTop: '20rem' }}>
      {/* <h1>Collection Info</h1>
      {collectionData && (
        <div>
          <p>Total Number of Holders: {collectionData.holders}</p>
          <p>Total Number of NFTs: {collectionData.assets}</p>
        </div>
      )} */}

      {/* <h2>User Rankings</h2> */}
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            {user.img && <img src={user.img} alt={`Profile of ${user.name}`} />}

            <p>User: {user.name}</p>
            <p>Total NFTs: {user.numNFTs}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionInfo;
