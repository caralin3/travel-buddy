import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Header } from '../Header';

describe('Header', () => {
  const logoutMock = jest.fn();

  it('should render correctly', () => {
    const wrapper = shallow(<Header logout={logoutMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render auth correctly', () => {
    const wrapper = shallow(<Header auth={true} logout={logoutMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
