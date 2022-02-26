import React, { FormEvent } from 'react';
import { Button, Form as BSForm, FormGroup as BSFormGroup, FormGroupProps, LabelProps } from 'reactstrap';

export interface FormProps {
  onSubmit: () => void;
  title?: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, title }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <BSForm
      className="d-flex flex-column align-items-center shadow-sm px-5 py-4 border rounded"
      onSubmit={handleSubmit}
    >
      {!!title && <h2 className="mb-4">{title}</h2>}
      {children}
      <Button className="mt-3 text-align-center align-self-center">Submit</Button>
    </BSForm>
  );
};

export const FormGroup: React.FC<FormGroupProps> = ({ children, props }) => (
  <BSFormGroup className="d-flex flex-column align-items-start" {...props}>
    {children}
  </BSFormGroup>
);
