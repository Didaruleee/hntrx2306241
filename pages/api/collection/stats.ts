import fetch from 'node-fetch'
import { NextApiRequest, NextApiResponse } from 'next';
import {ExplorerApi} from "atomicassets"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body
  } = req;
  
  switch (method) {
    case 'POST':
        {
            try {
                // const api = new ExplorerApi("http://88.98.194.186:9000", "atomicassets", { fetch });
                const whiteApi = await fetch(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`).then(res => res.json());
                // const whiteList = await whiteApi.data.whitelistName;
                // const whiteList = await whiteApi.json().then((data: any) => data.whitelistName);

                // let newArrs = await Promise.all(whiteList.map(async it => 
                //   { 
                //     try{
                //       let owners = await api.countAccounts({ collection_name: it });
                //       let total = await api.countAssets({ collection_name : it });
                //       let floor = await fetch(`http://88.98.194.186:9000/atomicmarket/v1/sales/templates?symbol=XPR&collection_name=${it}&page=1&limit=1&order=asc&sort=price`)
                //       .then(res => res.json());
                //       return {
                //         name: it,
                //         owners: owners,
                //         floor: floor.data.length == 0 ? 0 : floor.data[0]['price']['amount'],
                //         total: total
                //       }
                //     }catch(e){
                //       return {
                //         name: it,
                //         owners: 0,
                //         floor: 0,
                //         total: 0
                //       };
                //     }
                //   }
                // ));
            
                // await res.status(200).send({ success: true, data: newArrs });
                
                } catch (e) {
                  console.log(e);
                  res.status(500).send({
                      success: false,
                      message: e.message
                  });
                }
        }
      break;
    case 'PUT':
      break;
    case 'PATCH':
      break;
    default: 
      break;
    }
}

export default handler;
