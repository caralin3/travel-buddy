import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TripDetail } from '../../03-components';
import { trips } from '../../__mocks__';

export default {
  title: 'Components/Trip Detail',
  component: TripDetail,
  argTypes: {},
} as ComponentMeta<typeof TripDetail>;

const Template: ComponentStory<typeof TripDetail> = (args) => <TripDetail {...args} />;

export const WithDescription = Template.bind({});
WithDescription.args = {
  trip: trips[0],
};
