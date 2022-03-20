import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { cruises } from '../../__mocks__';
import { CruiseDetail } from '../CruiseDetail';

describe('CruiseDetail', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CruiseDetail cruise={cruises[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render with end correctly', () => {
    const wrapper = shallow(<CruiseDetail end cruise={cruises[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render with roundtrip correctly', () => {
    const wrapper = shallow(
      <CruiseDetail cruise={{ ...cruises[1], endDate: '2022-03-06', startDate: '2022-03-06' }} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render with end and without roundtrip correctly', () => {
    const wrapper = shallow(<CruiseDetail end cruise={cruises[1]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
