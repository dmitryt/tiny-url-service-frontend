import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  Link
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: lightblue;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-family: fantasy;
  font-size: 2rem;
  flex: 1 auto;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const UserInfo = styled.span`
  &:after {
    content: '|';
    padding: 0 5px;
  }
`;

type User = {
  email: string;
  firstName?: string;
  lastName?: string;
}

type Props = {
};

const Header = ({ ...rest }: Props) => {
  const user: User = {
    firstName: 'Will',
    lastName: 'Smith',
    email: 'will.smith@gmail.com',
  };
  const username = useMemo(() => {
    if (!user) {
      return null;
    }
    if (!user.firstName && !user.lastName) {
      return user.email;
    }
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user]);
  return (
    <Container>
      <Logo>
        <StyledLink to="/">URL Shortener</StyledLink>
      </Logo>
      {user && (
        <>
          <UserInfo>{username}</UserInfo>
          <a href="/">Logout</a>
        </>
      )}
    </Container>
  );
};

export default React.memo(Header);