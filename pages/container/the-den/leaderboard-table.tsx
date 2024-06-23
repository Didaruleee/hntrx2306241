import { Pagination, user } from '@nextui-org/react';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Imagea } from 'styles/index.styled';


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

const LeaderBoardTable = () => {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const { data } = await axios.get<CollectionData>(
          `https://proton.api.atomicassets.io/atomicassets/v1/collections/degenhoopers`
        );
        setCollectionData(data);
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<{ data: any[] }>(
          `https://proton.api.atomicassets.io/atomicassets/v1/assets?collection_name=degenhoopers&limit=1000`
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
    <section>
      <table className="table-fixed w-full overflow-x-auto">
        <thead>
          <tr className="solid">
            <th className="text-start xl:w-32 lg:w-28 md:w-24 w-20 pl-3">
              Rank
            </th>
            <th className="text-start xl:w-72 lg:w-64 md:w-52 w-48 pl-3">
              User
            </th>
            <th className="text-end xl:w-72 lg:w-64 md:w-52 w-48 pl-3">NFTs</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index} className="solid">
              <td className="xl:w-32 lg:w-28 md:w-24 w-20 pl-3">{index + 1}</td>
              <td className="xl:w-72 lg:w-64 md:w-52 w-48 pl-3 mt-1">
                <p className="text-secondary font-medium">{user.name}</p>

              </td>



              <td className="xl:w-72 lg:w-64 md:w-52 w-48 pl-3 justify-end">
                <div className="flex justify-end gap-2">
                  <p>{user.numNFTs}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <Pagination
          className="mt-1"
          color="secondary"
          isCompact
          showControls
          total={10}
          initialPage={1}
        />
      </div>
    </section>
  );
};

export default LeaderBoardTable;