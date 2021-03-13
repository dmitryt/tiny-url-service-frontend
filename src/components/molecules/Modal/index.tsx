import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.75;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  position: absolute;
  width: 50%;
  top: 0;
  left: 0;
  margin: auto;
  bottom: 0;
  right: 0;
  height: 30%;
  min-height: 300px;
  background-color: white;
  border-radius: 10px;

  &.small {
    height: 20%;
    min-height: 100px;
    width: 30%;
  }
`;

const Header = styled.div`
  height: 30px;
  font-size: 1.25rem;
  padding: 5px 20px;
  position: relative;
  border-bottom: 1px solid #999;
`;

const Footer = styled.div`
  border-top: 1px solid #999;
  height: 30px;
  text-align: center;
  padding-top: 10px;
`;

const Content = styled.div`
  height: calc(100% - 120px);
  overflow: auto;
  padding: 10px;
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  right: 10px;
`;

const StyledButton = styled(Button)`
  margin: 0 10px;
`;

type PortalProps = {
  rootId: string;
};

type ModalSize = 'small';

const Portal: FC<PortalProps> = ({ rootId, children }) => {
  const node = document.getElementById(rootId);
  return node ? (
    createPortal(children, node)
  ) : (
    <div />
  )
};

type Props = {
  visible: boolean;
  title: string;
  children: ReactNode;
  onAccept: () => void;
  onClose: () => void;
  size?: ModalSize;
};

const Modal: FC<Props> = ({ children, title, visible, size, onAccept, onClose, ...rest }) => {
  if (!visible) {
    return null;
  }
  return (
    <Portal rootId="modal">
      <Container>
        <Background />
        <ModalContent {...rest} className={`${size}`}>
          <Header>
            {title}
            <CloseIcon className="fa-times" onClick={onClose} />
          </Header>
          <Content>{children}</Content>
          <Footer>
            <StyledButton onClick={onAccept} value="OK" />
            <StyledButton onClick={onClose} value="Cancel" />
          </Footer>
        </ModalContent>
      </Container>
    </Portal>
  );
};

export default React.memo(Modal);
