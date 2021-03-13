import React, { useCallback } from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import LinkItem from '../molecules/LinkItem';
import { Link } from '../../types';

const Row = styled.div`
  display: flex;
`;

const LinksContainer = styled.div`
  height: 500px;
  overflow: auto;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const StyledInput = styled(Input)`
  flex: 1 auto;
  width: auto;
`;

const StyledLinkItem = styled(LinkItem)`
  border-bottom: 1px solid #999;

  &:last-child {
    border-bottom: none;
  }
`;


type Props = {
  links: Link[];
};

const Home = ({ links }: Props) => {
  const onChange = useCallback((v) => {
    console.log(v);
  }, []);
  const onLinkDelete = useCallback((v) => {
    console.log(v);
  }, []);
  const onEnterPress = useCallback(() => {
    console.log("ON ENTER");
  }, []);
  const onCreateURL = useCallback(() => {
    console.log();
  }, []);
  const tmpLinks = [
    {_id: '123', value: 'somevalue'},
    {_id: '124', value: 'somevalue'},
    {_id: '125', value: 'somevalue'},
    {_id: '126', value: 'somevalue'},
    {_id: '127', value: 'somevalue'},
    {_id: '128', value: 'somevalue'},
    {_id: '129', value: 'somevalue'},
    {_id: '130', value: 'somevalue'},
    {_id: '131', value: 'somevalue'},
    {_id: '133', value: 'somevalue'},
    {_id: '134', value: 'somevalue'},
    {_id: '136', value: 'somevalue'},
    {_id: '137', value: 'somevalue'},
    {_id: '138', value: 'somevalue'},
    {_id: '139', value: 'somevalue'},
    {_id: '140', value: 'somevalue'},
    {_id: '141', value: 'somevalue'},
    {_id: '142', value: 'somevalue'},
    {_id: '143', value: 'somevalue'},
    {_id: '144', value: 'somevalue'},
    {_id: '145', value: 'somevalue'},
    {_id: '146', value: 'somevalue'},
    {_id: '147', value: 'somevalue'},
    {_id: '148', value: 'somevalue'},
  ];
  return (
    <>
    <Row>
      <StyledInput onChange={onChange} onEnterPress={onEnterPress} />
      <StyledButton onClick={onCreateURL} value="Generate URL" />
    </Row>
    <h3>My Links({tmpLinks.length}):</h3>
    <LinksContainer>
      {tmpLinks.map((link) => (
        <StyledLinkItem key={link._id} link={link} onDelete={onLinkDelete} />
      ))}
    </LinksContainer>
    </>
  );
};

export default React.memo(Home);
