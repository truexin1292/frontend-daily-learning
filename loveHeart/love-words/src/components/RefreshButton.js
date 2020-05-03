import React from 'react';
import styled from 'styled-components';
import ImageRefresh from '../assets/img/refresh.svg';
import StyledButton from './StyledButton';

const Button = styled(StyledButton)`
  position: fixed;
  right: 20%;
  bottom: 40px;
  background-image: url(${ImageRefresh});
  transform: scale(2);
`;
export default function RefreshButton({ visible = false, handleUpdate }) {
  return <Button className={visible ? 'visible' : 'hidden'} onClick={handleUpdate}>
  </Button>;
}
