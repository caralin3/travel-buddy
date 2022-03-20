import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SeaDayDetail } from '../SeaDayDetail';

describe('SeaDayDetail', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SeaDayDetail day={1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
