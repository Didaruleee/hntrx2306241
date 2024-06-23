import { Pagination, Skeleton } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import proton from 'services/proton-rpc';
import { AvatarImage } from 'components/AvatarIcon/AvatarIcon.styled';
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
  avatar: string | null;
}

const LeaderBoardTablenew = () => {
  const router = useRouter();
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null,
  );
  const [userData, setUserData] = useState<UserData[]>(Array.from({ length: 50 }, () => ({ name: '', profilePicture: null, numNFTs: 0, img: null, avatar: null })));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const collectionName = router.query.collection as string; // Retrieve collection name from query parameters
        const { data } = await axios.get<CollectionData>(
          `https://proton.api.atomicassets.io/atomicassets/v1/collections/${collectionName}`,
        );
        setCollectionData(data);
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    };

    // const fetchUserData = async () => {
    //   try {
    //     const collectionName = router.query.collection as string; // Retrieve collection name from query parameters
    //     const { data } = await axios.get<{ data: any[] }>(
    //       `https://proton.api.atomicassets.io/atomicassets/v1/assets?collection_name=${collectionName}&limit=1000`
    //     );
    //     const users: { [key: string]: UserData } = {};
    //     data.data.forEach((asset: any) => {
    //       const owner = asset.owner;
    //       if (!users[owner]) {
    //         users[owner] = {
    //           name: owner,
    //           profilePicture: null,
    //           numNFTs: 0,
    //           img: null,
    //         };
    //       }
    //       users[owner].numNFTs++;
    //     });
    //     const sortedUsers = Object.values(users).sort((a, b) => b.numNFTs - a.numNFTs);
    //     setUserData(sortedUsers);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };
    const fetchUserData = async () => {
      try {
        const collectionName = router.query.collection as string;
        const { data } = await axios.get<{ data: any[] }>(
          `https://proton.api.atomicassets.io/atomicassets/v1/assets?collection_name=${collectionName}&limit=1000`,
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
              avatar: null,
            };
          }
          users[owner].numNFTs++;
        });

        const promises = Object.keys(users).map(async (owner) => {
          const avatar = await proton.getProfileImage(owner);
          users[owner].avatar = avatar;
        });
        await Promise.all(promises);
        const sortedUsers = Object.values(users).sort(
          (a, b) => b.numNFTs - a.numNFTs,
        );
        setUserData(sortedUsers);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (router.query.collection) {
      fetchCollectionData();
      fetchUserData();
    }
  }, [router.query.collection]);

  return (
    <section>
      {collectionData && (
        // <div>
        //   <h2>Collection: {router.query.collection}</h2>

        // </div>
        null
      )}
      <table className="table-fixed w-full overflow-x-auto ">
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
          {userData.filter(user => !isLoaded || user.name).map((user, index) => (
            <tr key={index} className="solid">
              <td className="xl:w-32 lg:w-28 md:w-24 w-20 pl-3">{index + 1}</td>
              <td className="xl:w-72 lg:w-64 md:w-52 w-48 pl-3 mt-1">
                <div className="flex  gap-2">
                  <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                    <AvatarImage >
                      <img src={user.avatar && user.avatar !== 'null'
                        ? `data:image/jpeg;base64,${user.avatar}`
                        : '/default-avatar.png'
                      } />
                    </AvatarImage>
                  </Skeleton>
                  <Skeleton className="h-6 p-4 w-3/5 rounded-lg" isLoaded={isLoaded}>
                    <p className="text-secondary font-medium">{user.name}</p>
                  </Skeleton>
                </div>
              </td>
              {/* <td className="xl:w-72 lg:w-64 md:w-52 w-48 pl-3 justify-end">
                <div className="flex justify-end gap-2">
                   
                </div>
              </td> */}

              <td className="xl:w-72 lg:w-64 md:w-52 w-48 pl-3 justify-end">
                <div className="flex justify-end gap-2">
                  <div>
                    {/* <Imagea
                    width={'32px'}
                    height={'32px'}
                    alt="avatar"
                    src={
                      user.avatar
                        ? `data:image/jpeg;base64,${user.avatar}`
                        : '/default-avatar.png'
                    }
                  /> */}
                  </div>
                  <Skeleton isLoaded={isLoaded} className='w-4 rounded-lg'>
                    <p>{user.numNFTs}</p>
                  </Skeleton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="flex justify-end">
        <Pagination
          className="mt-1"
          color="secondary"
          isCompact
          showControls
          total={10}
          initialPage={1}
        />
      </div> */}
    </section>
  );
};

export default LeaderBoardTablenew;
