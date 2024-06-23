import styled from 'styled-components';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type ImageContainerProps = {
  isAudio?: boolean;
  isVideo?: boolean;
};

export const ImageContainer = styled(FadeInImageContainer)<ImageContainerProps>`
  position: relative;
  height: 190px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  
   
  
`;

export const Image = styled.img`
  border-radius: 8px;
  max-width: 190px;
  max-height: 240px;
    @media (max-width: 598px) {
max-width: 140px;
  max-height: 170px;

  }
`;
