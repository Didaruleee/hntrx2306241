import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import proton from '../../../services/proton-rpc';
// const { transact } = require('../modules/api');

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    method,
  } = req;
  switch (method) {
    case 'POST':
        {
            try {
              // like, unlike, watch, unwatch
                const {
                  body: { data: { collection_name, actor, type } }
                } = req;
                const whiteApi = await axios.get(`${process.env.NEXT_PUBLIC_MY_URL}/api/data/whitelist`);
                const whiteList = whiteApi.data.data.whitelistName;
                if(-1 < whiteList.indexOf(collection_name)){
                  const types = ['wt', 'unwt'];
                  const actionType = type === 'wt' ? 'colwt' : type === 'unwt' ? 'colunwt' : '';

                  if(-1 < types.indexOf(type)){
                    // await transact([{
                    //   account: 'dgcontract',
                    //   name: actionType,
                    //   data: {
                    //     actor: actor,
                    //     collection_name: collection_name
                    //   },
                    //   authorization: [{ actor: 'dgcontract', permission: 'active'}]
                    // }]);

                    await res.status(200).send({ success: true });
                  }else{
                    res.status(500).send({
                      success: false,
                      message: 'type errors'
                    });
                  }
                }else{
                  res.status(500).send({
                    success: false,
                    message: 'no whitelist collection'
                  });
                }
            } catch (e) {
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
    default: {
      // try{
      //   const data = await proton.getColMutations("111231415155");
      // }catch(e){
      //   console.log(e);
      // }
    }
      break;
    }
}

export default handler;
