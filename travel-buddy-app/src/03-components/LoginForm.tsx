import React from 'react';
import { Label, Input } from 'reactstrap';
import { Form, FormGroup } from '../02-molecules';
import { isEmailValid } from '../utils';

export interface LoginFormProps {
  email: string;
  onSubmit: () => void;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ email, onSubmit, password, setEmail, setPassword }) => (
  <Form title="Login" onSubmit={onSubmit}>
    <FormGroup>
      <Label for="login-email">Email</Label>
      <Input
        required
        id="login-email"
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
      <Label for="login-password">Password</Label>
      <Input
        required
        id="login-password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: 250 }}
      />
    </FormGroup>
  </Form>
);
