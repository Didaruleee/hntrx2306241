import { useRouter } from 'next/router';
import { useAuthContext } from '../Provider/AuthProvider';
import { Template } from '../../services/templates';
import { Container } from './SelectGrid.styled';
import { useWindowSize } from '../../hooks';
import SelectTemplateCard from '../SelectTemplateCard';
import { NoDataWrap } from '../UserCollectionWatchView/UserCollectionWatchView.styled';

type Props = {
  setBulkHide: any;
  isLoadingPrices: boolean;
  items: Template[];
  isFilter: boolean;
  setCard: any;
  selectedCards: Template[];
  isBulk: boolean;
};

const SelectGrid = ({
  setBulkHide,
  isLoadingPrices,
  items,
  isFilter,
  setCard,
  selectedCards,
  isBulk,
}: Props): JSX.Element => {
  const router = useRouter();
  const size = useWindowSize();
  const { currentUser } = useAuthContext();
  const isUsersTemplates =
    currentUser && router.query.chainAccount === currentUser.actor;
  return (
    <Container
      columns={
        isFilter && isBulk
          ? Math.floor(size['windowWidth'] / 320)
          : isFilter || isBulk
          ? Math.floor(size['windowWidth'] / 300)
          : Math.floor(size['windowWidth'] / 258)
      }
      mobileBulk={isBulk && size.isMobile}>
      {items.length == 0 ? (
        <NoDataWrap>No Items</NoDataWrap>
      ) : (
        items.map((template) => (
          <SelectTemplateCard
            key={template.template_id}
            template={template}
            isUsersTemplates={isUsersTemplates}
            hasShimmer={isLoadingPrices}
            setCard={setCard}
            selectedCards={selectedCards}
            setBulkHide={setBulkHide}
          />
        ))
      )}
    </Container>
  );
};

SelectGrid.defaultProps = {
  items: [],
  isLoadingPrices: false,
};

export default SelectGrid;
