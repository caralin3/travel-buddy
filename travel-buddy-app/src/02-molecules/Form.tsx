import React, { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form as BSForm,
  FormProps as BSFormProps,
  FormGroup as BSFormGroup,
  FormGroupProps,
  Label as BSLabel,
  LabelProps as BSLabelProps,
  Spinner,
  Input,
  InputProps,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import { LinkItem } from '../types';

export interface FormProps extends BSFormProps {
  additionalLinks?: LinkItem[];
  loading?: boolean;
  onSubmit: VoidFunction;
  title?: string;
}

export const Form: React.FC<FormProps> = ({ additionalLinks, children, loading = false, onSubmit, title }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <BSForm className="d-flex flex-column shadow-sm px-5 py-4 border rounded" onSubmit={handleSubmit}>
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

export interface LabelProps extends BSLabelProps {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, props, required = false }) => (
  <BSLabel {...props}>
    {children}
    {required && <span className="text-danger">*</span>}
  </BSLabel>
);

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  id: string;
  label: string;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  options: SelectOption[];
  required?: boolean;
  value: string;
}

export const Select: React.FC<SelectProps> = ({ id, label, onSelect, options, required = false, value }) => (
  <FormGroup>
    <Label required={required} for={id}>
      {label}
    </Label>
    <Input id={id} defaultValue={value} name="select" type="select" onChange={onSelect} required={required}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Input>
  </FormGroup>
);

export interface CostInputProps extends InputProps {
  symbol?: string;
}

export const CostInput: React.FC<CostInputProps> = ({ symbol = '$', props }) => (
  <InputGroup>
    <InputGroupText>{symbol}</InputGroupText>
    <Input type="number" {...props} />
  </InputGroup>
);
