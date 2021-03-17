import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Input from '../atoms/Input';
import Button from '../atoms/Button';
import LinkItem from '../molecules/LinkItem';
import { Link } from '../../types';
import axios from '../../services/axios';
import DispatchContext from '../../contexts/dispatchContext';

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


const Home = () => {
  const [{ links: { items } }, dispatch] = useContext(DispatchContext);
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
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get('/links');
        dispatch({ type: 'SET_LINKS', data });
      } catch (e) {}
    };
    fetch();
  }, []);
  return (
    <>
    <Row>
      <StyledInput onChange={onChange} onEnterPress={onEnterPress} />
      <StyledButton onClick={onCreateURL} value="Generate URL" />
    </Row>
    <h3>My Links({items.length}):</h3>
    <LinksContainer>
      {items.map((link) => (
        <StyledLinkItem key={link._id} link={link} onDelete={onLinkDelete} />
      ))}
    </LinksContainer>
    </>
  );
};

export default React.memo(Home);
