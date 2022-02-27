import React, { FormEvent } from 'react';
import { Button, Form as BSForm, FormGroup as BSFormGroup, FormGroupProps, LabelProps, Spinner } from 'reactstrap';

export interface FormProps {
  loading?: boolean;
  onSubmit: () => void;
  title?: string;
}

export const Form: React.FC<FormProps> = ({ children, loading = false, onSubmit, title }) => {
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
      {!loading ? (
        <Button color="primary" className="mt-3 text-align-center align-self-center">
          Submit
        </Button>
      ) : (
        <Button className="mt-3 px-4 text-align-center align-self-center" disabled={true}>
          <Spinner size="sm">Loading...</Spinner>
        </Button>
      )}
    </BSForm>
  );
};

export const FormGroup: React.FC<FormGroupProps> = ({ children, props }) => (
  <BSFormGroup className="d-flex flex-column align-items-start" {...props}>
    {children}
  </BSFormGroup>
);
