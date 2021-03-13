import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.input`
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #999;
  cursor: pointer;
  min-width: 80px;
  height: 2rem;

  &:hover {
    background-color: #ccc;
  }

  &:disabled {
    background-color: #eee;
    cursor: default;
  }

  &:active {
    background-color: #aaa;
  }
`;

type ButtonProps = Omit<JSX.IntrinsicElements['input'], 'ref'>;

const Button = (props: ButtonProps) => (
  <StyledButton type={props.type || 'button'} {...props} />
);

export default React.memo(Button);
