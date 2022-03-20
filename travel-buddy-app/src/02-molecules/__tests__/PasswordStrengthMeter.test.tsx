import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PasswordStrengthMeter } from '../PasswordStrengthMeter';

describe('PasswordStrengthMeter', () => {
  it('should render danger color correctly', () => {
    const wrapper = shallow(<PasswordStrengthMeter value={5} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render success color correctly', () => {
    const wrapper = shallow(<PasswordStrengthMeter value={20} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render warning color correctly', () => {
    const wrapper = shallow(<PasswordStrengthMeter value={11} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
