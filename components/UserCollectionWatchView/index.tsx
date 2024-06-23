/* eslint-disable react/jsx-key */
import { useWindowSize } from '../../hooks';
import SearchInput from '../SearchInput';
import {
  ItemWrap,
  ItemImgWrap,
  Item,
  ColName,
  BottomWrap,
  BetweenWrap,
  NormalText,
  NoDataWrap,
} from './UserCollectionWatchView.styled';
import { Imagea } from '../../styles/index.styled';
import Link from 'next/link';
const UserCollectionWatchView = ({ data }): JSX.Element => {
  const size = useWindowSize();
  return data.length == 0 ? (
    <NoDataWrap>No Data</NoDataWrap>
  ) : (
    <ItemWrap columns={Math.floor(size['windowWidth'] / 255)}>
      {data.map((item) => (
        <Item>
          <Link href={`/collections/${item['collection_name']}`} legacyBehavior>

            <ItemImgWrap>
              <Imagea
                src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['data']['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                width="100%"
                height="100%"
              />
            </ItemImgWrap>
            <BottomWrap>
              <ColName>{item['data']['name']}</ColName>
              <BetweenWrap>
                <NormalText>
                  {item['data']['description'].substring(0, 58)}...
                </NormalText>
              </BetweenWrap>
              <BetweenWrap>
                <NormalText>by {item['author']}</NormalText>
              </BetweenWrap>
            </BottomWrap>

          </Link>
        </Item>
      ))}
    </ItemWrap>
  );
};

export default UserCollectionWatchView;
