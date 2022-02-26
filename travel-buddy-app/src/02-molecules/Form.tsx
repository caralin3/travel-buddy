import React from 'react';
import { Button, Form as BSForm, FormGroup } from 'reactstrap';

export interface FormProps {
  onSubmit: () => void;
  title: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, title }) => (
  <BSForm className="d-flex flex-column shadow-sm p-4 border rounded" onSubmit={onSubmit}>
    <h2 className="mb-4">{title}</h2>
    {children}
    <Button className="mt-3 text-align-center align-self-center">Submit</Button>
  </BSForm>
);
