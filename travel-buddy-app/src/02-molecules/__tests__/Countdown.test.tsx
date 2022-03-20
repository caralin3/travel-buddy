import { fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment';
import React from 'react';
import { Countdown, CountdownProps } from '../Countdown';

const CountdownTestComponent: React.FC<CountdownProps> = ({ date }) => {
  const [days, setDays] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setDays(1);
    }, 0);

    return () => {
      clearInterval(id);
    };
  }, [date]);
  return (
    <>
      <Countdown date={date} />
      <button title="days" onClick={() => setDays(days + 1)}>
        Set Days
      </button>
    </>
  );
};

const dateMock = moment().add(1, 'day');

describe('Countdown', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Countdown date="2022-03-12" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should get countdown correctly', async () => {
    const setIntervalSpy = jest.spyOn(window, 'setInterval');
    render(<Countdown date={dateMock.format('YYYY-MM-DD')} />);
    expect(setIntervalSpy).toHaveBeenCalled();
  });
});
