import React from 'react';
import { Label, Input } from 'reactstrap';
import { Form, FormGroup } from '../02-molecules';
import { isEmailValid } from '../utils';

export interface RegisterFormProps {
  email: string;
  errorMessage?: string;
  firstName: string;
  lastName: string;
  loading: boolean;
  onSubmit: () => void;
  password: string;
  passwordConfirm: string;
  setEmail: (value: string) => void;
  setErrorMessage?: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  errorMessage,
  firstName,
  lastName,
  loading,
  onSubmit,
  password,
  passwordConfirm,
  setEmail,
  setErrorMessage,
  setFirstName,
  setLastName,
  setPassword,
  setPasswordConfirm,
}) => {
  const setMessage = () => {
    if (setErrorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <Form title="Register" onSubmit={onSubmit} loading={loading}>
      <FormGroup>
        <Label for="register-first-name">First Name</Label>
        <Input
          required
          id="register-first-name"
          name="first-name"
          placeholder="Jane"
          type="text"
          value={firstName}
          onChange={(e) => {
            setMessage();
            setFirstName(e.target.value);
          }}
          style={{ width: 250 }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="register-last-name">Last Name</Label>
        <Input
          required
          id="register-last-name"
          name="last-name"
          placeholder="Doe"
          type="text"
          value={lastName}
          onChange={(e) => {
            setMessage();
            setLastName(e.target.value);
          }}
          style={{ width: 250 }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="register-email">Email</Label>
        <Input
          required
          id="register-email"
          name="email"
          placeholder="jDoe@email.com"
          type="email"
          value={email}
          invalid={!!email && !isEmailValid(email)}
          valid={!!email && isEmailValid(email)}
          onChange={(e) => {
            setMessage();
            setEmail(e.target.value);
          }}
          style={{ width: 250 }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="register-password">Password</Label>
        <Input
          required
          id="register-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setMessage();
            setPassword(e.target.value);
          }}
          style={{ width: 250 }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="register-confirm-password">Confim Password</Label>
        <Input
          required
          id="register-confirm-password"
          name="confirm-password"
          type="password"
          value={passwordConfirm}
          invalid={!!passwordConfirm && password !== passwordConfirm}
          valid={!!passwordConfirm && password === passwordConfirm}
          onChange={(e) => {
            setMessage();
            setPasswordConfirm(e.target.value);
          }}
          style={{ width: 250 }}
        />
      </FormGroup>
      {!!errorMessage && <p className="form-text text-danger">{errorMessage}</p>}
    </Form>
  );
};