import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { StateSelector } from '../StateSelector';

describe('StateSelector', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<StateSelector id="state" label="Select" onSelect={jest.fn()} value="Ohio" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
