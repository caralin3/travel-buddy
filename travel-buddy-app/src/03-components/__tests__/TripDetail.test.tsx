import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { activities, cruises, flights, hotels } from '../../__mocks__';
import { TripDetail } from '../TripDetail';

describe('TripDetail', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <TripDetail activities={activities} day="2022-06-03" cruises={cruises} flights={flights} hotels={hotels} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render empty correctly', () => {
    const wrapper = shallow(
      <TripDetail activities={activities} day="2034-06-03" cruises={cruises} flights={flights} hotels={hotels} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
