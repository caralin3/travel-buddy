import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ItineraryCard } from '../ItineraryCard';

describe('ItineraryCard', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ItineraryCard date="2022-03-24" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
