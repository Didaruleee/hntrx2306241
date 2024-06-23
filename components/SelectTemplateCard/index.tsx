import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import {
  Card,
  Row,
  Title,
  Text,
  GreyText,
  Tag,
  CollectionNameButton,
  PlaceholderPrice,
  ShimmerBlock,
  Author,
  GreyBy,
  Price,
  SelectedCheck,
  AddBtn,
} from './SelectTemplateCard.styled';
import TemplateImage from '../TemplateImage';
import TemplateVideo from '../TemplateVideo';
import {
  IPFS_RESOLVER_VIDEO,
  IPFS_RESOLVER_IMAGE,
  RESIZER_IMAGE,
} from '../../utils/constants';
import { useAuthContext } from '../Provider';
import { Template } from '../../services/templates';
import Image from "next/legacy/image";
import Link from 'next/link';

type Props = {
  template: Template;
  isUsersTemplates?: boolean;
  hasShimmer?: boolean;
  setCard: any;
  selectedCards: Template[];
  setBulkHide: any;
};

const SelectTemplateCard = ({
  template,
  isUsersTemplates,
  hasShimmer,
  selectedCards,
  setCard,
  setBulkHide,
}: Props): JSX.Element => {
  const {
    template_id,
    name,
    collection: { author, collection_name, img, name: collectionDisplayName },
    immutable_data: { glbthumb, model, image, video },
    data,
    max_supply,
    lowestPrice,
    totalAssets,
    assetsForSale,
    issued_supply,
  } = template;

  const { currentUser } = useAuthContext();
  const [templateVideoSrc, setTemplateVideoSrc] = useState<string>('');
  const [templateImgSrc, setTemplateImgSrc] = useState<string>('');
  const [fallbackImgSrc, setFallbackImgSrc] = useState<string>('');
  useEffect(() => {
    const videoSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${
      video || data['video']
    }?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
    const imageSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${
      data.glbthumb || data.image
    }?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
    const fallbackImageSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${
      data.glbthumb || data.image
    }?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;

    setTemplateVideoSrc(videoSrc);
    setTemplateImgSrc(imageSrc);
    setFallbackImgSrc(fallbackImageSrc);
  }, [image, video, glbthumb, model]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const isMyTemplate =
    currentUser && router.query.chainAccount === currentUser.actor;
  const redirectPath = isMyTemplate
    ? `/details/${currentUser.actor}/${collection_name}/${
        template_id == undefined
          ? template['template'].template_id
          : template_id
      }`
    : `/collections/${collection_name}/${
        template_id == undefined
          ? template['template'].template_id
          : template_id
      }`;
  const ownerHasMultiple =
    totalAssets && !isNaN(parseInt(totalAssets)) && parseInt(totalAssets) > 1;
  const hasMultiple =
    !totalAssets && !isNaN(parseInt(issued_supply))
      ? parseInt(issued_supply) > 1
      : false;

  const selectCard = () => {
    const newArr = selectedCards;
    const index = newArr.findIndex(
      (tem) => tem['sale_id'] == template['sale_id']
    );
    if (selectedCards.length === 0) {
      setBulkHide(false);
    }
    if (-1 < index) {
      newArr.splice(index, 1);
      if (newArr.length == 0) {
        setBulkHide(true);
      }
    } else {
      newArr.push(template);
    }
    setCard([...newArr]);
  };

  const openCollectionPage = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/${collection_name}`);
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      selectCard();
    }
  };

  const priceTag =
    isUsersTemplates && assetsForSale && totalAssets ? (
      <Tag>
        {assetsForSale}/{totalAssets} FOR SALE
      </Tag>
    ) : null;

  const priceSection = hasShimmer ? (
    <ShimmerBlock aria-hidden />
  ) : lowestPrice ? (
    <Price>
      <Image src="/new/price-xpr.svg" width={19} height={20} />
      <span style={{ marginLeft: '5px' }}>{lowestPrice}</span>
    </Price>
  ) : (
    <PlaceholderPrice aria-hidden style={{ height: '37px' }} />
  );
  return (
    <Card
      tabIndex={0}
      hasMultiple={ownerHasMultiple || hasMultiple}
      onClick={() => {}}
      onKeyDown={handleEnterKey}
      isSelected={
        0 <
        selectedCards.filter((tem) => tem['sale_id'] == template['sale_id'])
          .length
      }>
      {0 <
      selectedCards.filter((tem) => tem['sale_id'] == template['sale_id'])
        .length ? (
        <SelectedCheck src="/selected.svg" />
      ) : null}
      <Link href={redirectPath} legacyBehavior>

        {video || data['video'] ? (
          <TemplateVideo
            src={templateVideoSrc}
            priceTag={priceTag}
            autoPlay={false}
          />
        ) : (
          <TemplateImage
            templateImgSrc={templateImgSrc}
            fallbackImgSrc={fallbackImgSrc}
            ipfsHash={image}
            templateName={name}
            priceTag={priceTag}
          />
        )}
        <Row>
          <Text
            style={{ maxWidth: 'calc(100% - 30px)' }}
            onClick={() => (window.location.href = redirectPath)}>
            {name}
          </Text>
          <CollectionNameButton
            onClick={openCollectionPage}></CollectionNameButton>
        </Row>

      </Link>
      {priceSection}
      <AddBtn id="add-btn" onClick={selectCard}>
        {0 <
        selectedCards.filter((tem) => tem['sale_id'] == template['sale_id'])
          .length
          ? 'Remove from cart'
          : 'Add to cart'}
      </AddBtn>
    </Card>
  );
};

SelectTemplateCard.defaultProps = {
  collectionName: 'Collection',
  templateName: 'Name',
  maxSupply: 0,
  hasShimmer: false,
  isCreatePreview: false,
};

export default SelectTemplateCard;
