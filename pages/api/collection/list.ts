import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import proton from '../../../services/proton-rpc';
import { addPrecisionDecimal } from '../../../utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
    body: { data: {after} }
  } = req;
  switch (method) {
    case 'POST':
        {
            try { 
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                const verifiedValue = whiteApi.data.data.verifiedValue;
                const collectionUrl = 0 < after ? `http://88.98.194.186:9000/atomicmarket/v1/stats/collections?symbol=XPR&after=${after}&sort=volume` : `http://88.98.194.186:9000/atomicmarket/v1/stats/collections?symbol=XPR&sort=volume`;
                const volumeUrl = 0 < after ? `http://88.98.194.186:9000/atomicmarket/v1/stats/collections?symbol=XUSDC&after=${after}&sort=volume` : `http://88.98.194.186:9000/atomicmarket/v1/stats/collections?symbol=XUSDC&sort=volume`;
                const rate = await proton.getXPRrate();
                const collections = await axios.get(collectionUrl, {
                        data: {
                            collection_whitelist: whiteList.join(',')
                        }
                });

         
                const allcollections = await axios.get(`http://88.98.194.186:9000/atomicmarket/v1/stats/collections?symbol=XPR&sort=volume`, {
                        data: {
                            collection_whitelist: whiteList.join(',')
                        }
                });

                const xusdcVol = await axios.get(volumeUrl, {
                    data: {
                            collection_whitelist: whiteList.join(',')
                }});

                const allxusdcVol = await axios.get(`http://88.98.194.186:9000/atomicmarket/v1/stats/collections?symbol=XUSDC&sort=volume`, {
                    data: {
                            collection_whitelist: whiteList.join(',')
                }});
                
                let newArr = await collections.data.data.results;
                let xusdcArr = await xusdcVol.data.data.results;
                let allnewArr = await allcollections.data.data.results;
                let allxusdcArr = await allxusdcVol.data.data.results;

                for(let i = 0; i < newArr.length; i++){
                  try{
                    let usdVol = await xusdcArr.filter((it) => it['collection_name'] == newArr[i]['collection_name'])[0]['volume'];
                    let usdxpr = (await Math.floor((parseInt(addPrecisionDecimal(usdVol, 6, true)) / rate))) * 10000;
                    let allusdVol = (await allxusdcArr.filter((it) => it['collection_name'] == newArr[i]['collection_name']).length) == 0 ? '0' : allxusdcArr.filter((it) => it['collection_name'] == newArr[i]['collection_name'])[0]['volume'];
                    let allusdxpr = (await Math.floor((parseInt(addPrecisionDecimal(allusdVol, 6, true)) / rate))) * 10000;
                    let allvolume = (await allnewArr.filter((it) => it['collection_name'] == newArr[i]['collection_name']).length) == 0 ? '0' : allnewArr.filter((it) => it['collection_name'] == newArr[i]['collection_name'])[0]['volume'];

                    newArr[i]['sales'] = await String(parseInt(newArr[i]['sales']) + parseInt(xusdcArr.filter((it) => it['collection_name'] == newArr[i]['collection_name'])[0]['sales']));
                    newArr[i]['volume'] = await String(parseInt(newArr[i]['volume']) + usdxpr);
                    newArr[i]['totvolume'] = await String(parseInt(allvolume) + allusdxpr);
                    newArr[i]['rating'] = await verifiedValue.filter((veri) => veri['name'] == newArr[i]['collection_name'])[0]['rating'];
                  }catch(e){
                    console.log(e);
                  }
                }

                await res.status(200).send({ success: true, data: [...newArr] });
                
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
