import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import LinkItem from '../molecules/LinkItem';
import axios from '../../services/axios';
import { errorToast, successToast } from '../../services/toast';
import DispatchContext from '../../contexts/dispatchContext';
import AddField from '../molecules/AddField';
import { Data as FormData } from '../molecules/Form';

const LinksContainer = styled.div`
  height: 500px;
  overflow: auto;
`;

const StyledLinkItem = styled(LinkItem)`
  border-bottom: 1px solid #999;

  &:last-child {
    border-bottom: none;
  }
`;


const Home = () => {
  const [{ links: { items } }, dispatch] = useContext(DispatchContext);
  const [isAddingLink, setAddingLink] = useState(false);
  const onLinkDelete = useCallback(async (id) => {
    try {
      await axios.delete(`/links/${id}`);
      dispatch({ type: 'DELETE_LINK', data: id });
      successToast('Link was removed successfully');
    } catch (e) {
      errorToast('Something went wrong');
    }
  }, []);
  const onLinkAdd = useCallback(async (payload: FormData) => {
    setAddingLink(true);
    try {
      const { data } = await axios.post('/links', payload);
      dispatch({ type: 'ADD_LINK', data });
      successToast('Link was created successfully');
    } catch (e) {
      errorToast('Something went wrong');
    }
    setAddingLink(false);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get('/links');
        dispatch({ type: 'SET_LINKS', data });
      } catch (e) {
        errorToast('Something went wrong');
      }
    };
    fetch();
  }, []);
  return (
    <>
    <AddField onSubmit={onLinkAdd} disabled={isAddingLink} />
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
