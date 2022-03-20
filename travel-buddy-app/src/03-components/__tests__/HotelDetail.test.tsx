import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { hotels } from '../../__mocks__';
import { HotelDetail } from '../HotelDetail';

describe('HotelDetail', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<HotelDetail hotel={hotels[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render with check-in correctly', () => {
    const wrapper = shallow(<HotelDetail checkIn hotel={{ ...hotels[0], addressLine2: 'apt', postalCode: '12345' }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
