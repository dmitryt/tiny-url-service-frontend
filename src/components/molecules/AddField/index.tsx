import React from 'react';
import styled from 'styled-components';

import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import Form, { Data as FormData, Errors as FormErrors } from '../Form';
import FormField from '../FormField';

const Row = styled.div`
  display: flex;
  padding: 5px 0;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledFormField= styled(FormField)`
  flex: 1;
`;

type Props = {
  onSubmit: (d: FormData) => void;
  disabled?: boolean;
};

const AddField = ({ onSubmit, disabled, ...rest }: Props) => {
  return (
    <Form onSubmit={onSubmit} isSubmitting={disabled} resetOnSubmit>
      {({ isSubmitting, ...props }) => (
        <Row {...rest}>
          <StyledFormField name="full_url" Component={StyledInput} {...props} />
          <StyledButton type="submit" value="Generate URL" disabled={!props.data.full_url || isSubmitting} />
        </Row>
      )}
    </Form>
  );
};

export default React.memo(AddField);
