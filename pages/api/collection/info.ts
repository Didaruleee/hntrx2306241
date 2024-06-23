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
    body: {
      data: { collection },
    },
  } = req;
  switch (method) {
    case 'POST':
      {
        try {
          const volume = await axios.get(
            `https://proton.api.atomicassets.io/atomicmarket/v1/stats/collections/${collection}?symbol=XPR`
          );
          const usdVolume = await axios.get(
            `https://proton.api.atomicassets.io/atomicmarket/v1/stats/collections/${collection}?symbol=XUSDC`
          );
          const total = await axios.get(
            `https://proton.api.atomicassets.io/atomicassets/v1/collections/${collection}/stats`
          );
          const salesXPR = await axios.get(
            `https://proton.api.atomicassets.io/atomicmarket/v1/prices/sales/days?collection_name=${collection}&symbol=XPR`
          );
          let ar = true;
          let page = 1;
          let listedXPRArr = [];
          while (ar) {
            const listedXPR = await axios.get(
              `https://proton.api.atomicassets.io/atomicmarket/v2/sales?state=1&page=${page}&limit=100&order=desc&sort=created&symbol=XPR&collection_name=${collection}`
            );
            listedXPRArr = [...listedXPRArr, ...listedXPR.data.data];
            page++;
            if (listedXPR.data.data.length < 100) {
              ar = false;
            }
          }
          const salesXUSDC = await axios.get(
            `https://proton.api.atomicassets.io/atomicmarket/v1/prices/sales/days?collection_name=${collection}&symbol=XUSDC`
          );
          const floor = await axios.get(
            `https://proton.api.atomicassets.io/atomicmarket/v1/sales/templates?symbol=XPR&collection_name=${collection}&page=1&limit=1&order=asc&sort=price`
          );
          const owners = await axios.get(
            `https://proton.api.atomicassets.io/atomicassets/v1/accounts/_count?collection_name=${collection}&has_assets=true&sort=created&order=desc`
          );
          
          

          const rate = await proton.getXPRrate();
          const usdXpr =
            (await Math.floor(
              parseInt(
                addPrecisionDecimal(usdVolume.data.data.result.volume, 6, true)
              ) / rate
            )) * 10000;
          let totalNum = 0;
          const totalCnt =
            salesXPR.data.data.length + salesXUSDC.data.data.length;

          for (let i = 0; i < salesXPR.data.data.length; i++) {
            const val = salesXPR.data.data[i]['median'].substring(
              0,
              salesXPR.data.data[i]['median'].length - 4
            );
            totalNum += parseInt(val);
          }

          for (let i = 0; i < salesXUSDC.data.data.length; i++) {
            const val = salesXUSDC.data.data[i]['median'].substring(
              0,
              salesXUSDC.data.data[i]['median'].length - 6
            );
            totalNum += parseInt(val) / rate;
          }

          const newObj = {
            volume: String(parseInt(volume.data.data.result.volume) + usdXpr),
            total: total.data.data.assets - total.data.data.burned,
            // last: salesXPR.data.data[0]['median'],
            floor:
              floor.data.data.length == 0
                ? '0'
                : floor.data.data[0]['price']['amount'],
            owners: owners.data.data,
            avg: totalNum / totalCnt,
            listedCnt: listedXPRArr.length,
          };

          await res.status(200).send({ success: true, data: newObj });
        } catch (e) {
          res.status(500).send({
            success: false,
            message: e.message,
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
};

export default handler;
