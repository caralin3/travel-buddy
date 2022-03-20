import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Card } from '../Card';

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Card title="Card" buttonLabel="Click" link={{ path: '#', label: 'Link' }} subtitle="Subtitle" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
