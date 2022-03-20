import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { cruise1Ports } from '../../__mocks__';
import { PortDetail } from '../PortDetail';

describe('PortDetail', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PortDetail port={cruise1Ports[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const wrapper = shallow(
      <PortDetail port={{ ...cruise1Ports[0], arrival: '2022-03-24', departure: '2022-03-24', state: undefined }} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
