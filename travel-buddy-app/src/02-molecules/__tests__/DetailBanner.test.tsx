import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DetailBanner } from '../DetailBanner';

describe('DetailBanner', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <DetailBanner description="Description" endDate="2022-03-31" startDate="2022-03-20" title="Title" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
