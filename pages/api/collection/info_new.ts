import axios from 'axios';
import { profile } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserData {
  name: string;
  profilePicture: string | null;
  img: string | null;
  numNFTs: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const {
    method,
    body: {
      data: { collection },
    },
  } = req;
  console.log("collection new is:", collection)

  switch (method) {
    case 'POST': {
      try {
        const profile = await axios.get(
          `https://proton.api.atomicassets.io/atomicassets/v1/assets?collection_name=${collection}&limit=1000`,
        );

        const fetchUserData = () => {
          const users: { [key: string]: UserData } = {};
          profile.data.data.forEach((asset: any) => {
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
            (a, b) => b.numNFTs - a.numNFTs,
          );
          return sortedUsers; // Return the sorted users array
        };

        const userData = fetchUserData(); // Call the function to get the data

        res.status(200).json({ success: true, data: userData }); // Send the data in the response
      } catch (e) {
        res.status(500).json({
          success: false,
          message: e.message,
          
        });
      }
      break;
    }
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
  
};

export default handler;