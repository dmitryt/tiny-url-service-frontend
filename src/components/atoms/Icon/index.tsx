import React from 'react';
import styled from 'styled-components';

const StyledNode = styled.i`
  padding: 2px 5px;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #999;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }

  &:active {
    background-color: #aaa;
  }
`;

const Icon = (props: any ) => (
  <StyledNode aria-hidden="true" {...props} className={`fa ${props.className}`} />
);

export default React.memo(Icon);
