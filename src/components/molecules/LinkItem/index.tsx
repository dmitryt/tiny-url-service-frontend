import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Link } from '../../../types';
import Icon from '../../atoms/Icon';
import Modal from '../Modal';

const Row = styled.div`
  display: flex;
  padding: 5px 0;
`;

const Value = styled.div`
  flex: 1 auto;
`;

const Panel = styled.div`
  display: flex;
  justify-content: space-around;
`;


type Props = {
  link: Link;
  onDelete: (id: string) => void;
};

const LinkItem = ({ link, onDelete, ...rest }: Props) => {
  const [isVisibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const onDeleteCb = useCallback(() => {
    setVisibleDeletePopup(true);
  }, [setVisibleDeletePopup]);
  const closeModal = useCallback(() => {
    setVisibleDeletePopup(false);
    // onDelete(link._id);
  }, [setVisibleDeletePopup]);
  const doDelete = useCallback(() => {
    onDelete(link._id);
    closeModal();
  }, [onDelete, closeModal]);
  return (
    <Row {...rest}>
      <Value title={link.alias}>{link.url}</Value>
      <Panel>
        <Icon className="fa-times" onClick={onDeleteCb} />
      </Panel>
      <Modal title="Delete Item" size="small" visible={isVisibleDeletePopup} onAccept={doDelete} onClose={closeModal}>
        <span>Are you sure, you want to remove this link?</span>
      </Modal>
    </Row>
  );
};

export default React.memo(LinkItem);
