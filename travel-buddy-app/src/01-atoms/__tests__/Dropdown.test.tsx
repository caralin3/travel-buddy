import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Dropdown } from '../Dropdown';

describe('Dropdown', () => {
  const mockToggle = jest.fn();

  const wrapper = (isOpen?: boolean) => {
    const props = {
      isOpen,
      label: 'Dropdown',
      menuItems: [
        {
          label: 'One',
          onClick: jest.fn(),
        },
        { label: 'Two', onClick: jest.fn() },
      ],
      toggle: mockToggle,
    };

    return shallow(<Dropdown {...props} />);
  };

  it('should render correctly', () => {
    const component = wrapper();
    expect(toJson(component)).toMatchSnapshot();
  });
  it('should render open correctly', () => {
    const component = wrapper(true);
    expect(toJson(component)).toMatchSnapshot();
  });
});
