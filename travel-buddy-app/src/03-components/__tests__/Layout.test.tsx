import { fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '../Layout';

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as any),
  useDispatch: jest.fn(),
  useSelector: () => true,
}));

const logoutMock = jest.fn();

const LayoutTestComponent: React.FC = () => {
  return (
    <Layout>
      <button title="logout" onClick={logoutMock}>
        logout
      </button>
    </Layout>
  );
};

describe('Layout', () => {
  it('should render correctly', async () => {
    const wrapper = shallow(<Layout />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render auth links', async () => {
    render(<LayoutTestComponent />, { wrapper: MemoryRouter });
    const dashboardLink = await screen.findByText('Dashboard');
    expect(dashboardLink.textContent).toBe('Dashboard');
  });
  it('should handle logout', async () => {
    render(<LayoutTestComponent />, { wrapper: MemoryRouter });
    const logoutBtn = await screen.findByTitle('logout');
    fireEvent.click(logoutBtn);
    expect(logoutMock).toHaveBeenCalled();
  });
});
