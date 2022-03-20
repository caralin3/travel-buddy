import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { EmptyMessage } from '../EmptyMessage';

describe('EmptyMessage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<EmptyMessage message="Message" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render with link correctly', () => {
    const wrapper = shallow(<EmptyMessage link={{ label: 'Link', path: '/' }} message="Message" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
