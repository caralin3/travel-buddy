import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { activities } from '../../__mocks__';
import { ActivityDetail } from '../ActivityDetail';

describe('ActivityDetail', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ActivityDetail activities={activities} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
