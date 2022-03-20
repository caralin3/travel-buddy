import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { UpcomingTripBanner } from '../UpcomingTripBanner';

describe('UpcomingTripBanner', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UpcomingTripBanner title="Trip" date="2121-05-12" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
