import React from 'react';
import { Label, Input } from 'reactstrap';
import { Form, FormGroup } from '../02-molecules';
import { isEmailValid } from '../utils';

export interface RegisterFormProps {
  email: string;
  firstName: string;
  lastName: string;
  onSubmit: () => void;
  password: string;
  passwordConfirm: string;
  setEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  firstName,
  lastName,
  onSubmit,
  password,
  passwordConfirm,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setPasswordConfirm,
}) => (
  <Form title="Register" onSubmit={onSubmit}>
    <FormGroup>
      <Label for="register-first-name">First Name</Label>
      <Input
        required
        id="register-first-name"
        name="first-name"
        placeholder="Jane"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
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
        onChange={(e) => setLastName(e.target.value)}
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
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
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
        onChange={(e) => setPasswordConfirm(e.target.value)}
        style={{ width: 250 }}
      />
    </FormGroup>
  </Form>
);
