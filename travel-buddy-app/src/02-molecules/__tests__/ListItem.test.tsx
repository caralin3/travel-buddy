import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ListItem, ListItemProps } from '../ListItem';

const props: ListItemProps = {
  dates: '2022-03-24',
  description: 'Description',
  heading: 'Heading',
  onClick: jest.fn(),
};

describe('ListItem', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ListItem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
