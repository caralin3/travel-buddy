import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
