import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Banner } from '../Banner';

describe('Banner', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Banner />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
