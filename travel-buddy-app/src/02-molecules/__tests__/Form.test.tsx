import { fireEvent, render } from '@testing-library/react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { CostInput, Form, FormGroup, FormProps, Label, Select } from '../Form';

describe('Form', () => {
  describe('Form component', () => {
    const props: FormProps = {
      additionalLinks: [{ path: '#', label: 'Link' }],
      onSubmit: jest.fn(),
      title: 'Form',
    };

    it('should render correctly', () => {
      const wrapper = shallow(<Form {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render loading correctly', () => {
      const wrapper = shallow(<Form {...props} loading={true} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should handle submit correctly', async () => {
      const submitMock = jest.fn();
      const { container } = render(<Form onSubmit={submitMock} />);
      const form = container.querySelector('form');
      if (form) {
        fireEvent.submit(form);
        expect(submitMock).toHaveBeenCalled();
      }
    });
  });
  describe('FormGroup component', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<FormGroup></FormGroup>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('Label component', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<Label>test label</Label>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render required correctly', () => {
      const wrapper = shallow(<Label required>test label</Label>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('Select component', () => {
    it('should render correctly', () => {
      const selectMock = jest.fn();
      const wrapper = shallow(
        <Select
          id="select2"
          label="Label2"
          onSelect={selectMock}
          options={[
            { label: 'option1', value: '1' },
            { label: 'option2', value: '2' },
          ]}
          value="2"
        />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render required correctly', () => {
      const selectMock = jest.fn();
      const wrapper = shallow(
        <Select
          required
          id="select"
          label="Label"
          onSelect={selectMock}
          options={[
            { label: 'option1', value: '1' },
            { label: 'option2', value: '2' },
          ]}
          value="1"
        />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  describe('CostInput component', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<CostInput />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly', () => {
      const wrapper = shallow(<CostInput symbol="$" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
