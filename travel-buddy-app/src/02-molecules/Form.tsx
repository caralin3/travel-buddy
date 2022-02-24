import React from 'react';
import { Button, Form as BSForm, FormGroup } from 'reactstrap';

export interface FormProps {
  onSubmit: () => void;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => (
  <BSForm onSubmit={onSubmit}>
    <FormGroup>{children}</FormGroup>
    <Button>Submit</Button>
  </BSForm>
);
