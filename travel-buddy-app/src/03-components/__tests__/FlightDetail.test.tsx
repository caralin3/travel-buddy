import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { flights } from '../../__mocks__';
import { FlightDetail } from '../FlightDetail';

describe('FlightDetail', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<FlightDetail flight={flights[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render with trip correctly', () => {
    const wrapper = shallow(<FlightDetail showTrip flight={flights[1]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
