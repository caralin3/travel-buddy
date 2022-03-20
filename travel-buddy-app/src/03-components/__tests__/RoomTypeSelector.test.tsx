import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RoomTypeSelector } from '../RoomTypeSelector';

describe('RoomTypeSelector', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RoomTypeSelector id="room" label="Select" onSelect={jest.fn()} value="SINGLE" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
