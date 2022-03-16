import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form, FormGroup } from '../../02-molecules';
import { Input, Label } from 'reactstrap';

export default {
  title: 'Molecules/Form',
  component: Form,
  argTypes: {
    onSubmit: { action: 'submit' },
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => (
  <Form {...args}>
    <FormGroup>
      <Label for="exampleEmail">Email</Label>
      <Input id="exampleEmail" name="email" placeholder="with a placeholder" type="email" />
    </FormGroup>
    <FormGroup>
      <Label for="examplePassword">Password</Label>
      <Input id="examplePassword" name="password" placeholder="password placeholder" type="password" />
    </FormGroup>
  </Form>
);

export const Example = Template.bind({});
Example.args = {
  title: 'Form Title',
};
