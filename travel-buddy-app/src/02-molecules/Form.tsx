import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form as BSForm, FormGroup as BSFormGroup, FormGroupProps, Spinner } from 'reactstrap';
import { LinkItem } from '../types';

export interface FormProps {
  additionalLinks?: LinkItem[];
  loading?: boolean;
  onSubmit: () => void;
  title?: string;
}

export const Form: React.FC<FormProps> = ({ additionalLinks, children, loading = false, onSubmit, title }) => {
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
      {!!additionalLinks &&
        additionalLinks.length > 0 &&
        additionalLinks.map((link) => (
          <Link className="mt-3" key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
    </BSForm>
  );
};

export const FormGroup: React.FC<FormGroupProps> = ({ children, props }) => (
  <BSFormGroup className="d-flex flex-column align-items-start" {...props}>
    {children}
  </BSFormGroup>
);
