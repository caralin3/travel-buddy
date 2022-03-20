import { fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DropdownItemProps } from 'reactstrap';
import { AddDropdown } from '../AddDropdown';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUseNavigate,
  useLocation: () => ({ pathname: 'trip' }),
}));

jest.mock('reactstrap', () => ({
  ...jest.requireActual('reactstrap'),
  DropdownItem: ({ onClick }: DropdownItemProps) => {
    const handleClick = (e: any) => {
      if (onClick) {
        onClick(e);
        mockedUseNavigate();
      }
    };
    return <button title="dropdown-item" onClick={handleClick}></button>;
  },
}));

describe('AddDropdown.tsx', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AddDropdown />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should handle dropdown item click event', async () => {
    render(<AddDropdown />);
    const items = await screen.findAllByTitle('dropdown-item');
    for (let item of items) {
      fireEvent.click(item);
      expect(mockedUseNavigate).toHaveBeenCalled();
    }
  });
  it('should toggle dropdown', async () => {
    const { container } = render(<AddDropdown />);
    const toggleButton = container.querySelector('button.dropdown-toggle');
    if (toggleButton) {
      fireEvent.click(toggleButton);
      const expandedDropdown = container.querySelector('button.dropdown-toggle[aria-expanded="true"]');
      expect(expandedDropdown).toBeInTheDocument();
    }
  });
});
