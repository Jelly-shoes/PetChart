import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';

import PetNameButton from '../client/components/PetNameButton.jsx';
import Home from '../client/components/Home.jsx';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('PetNameButton', () => {
    let wrapper;
    const props = {
      petId: '1234',
      petName: 'Chubbs'
    };

    beforeAll(() => {
      wrapper = shallow(<PetNameButton {...props} />);
    });

    // PetNameButton should be a button with text prop props.petName
    it('should render without throwing an error', () => {
      expect(wrapper.text()).toEqual('Chubbs');
    });
  });

  describe('home component', () => {
    let wrapper;
    const props = {};

    beforeAll(() => {
      wrapper = shallow(<Home {...props} />);
    });

    it('should render a div called greeting', () => {
      expect(wrapper.contains(<div className="greeting"></div>)).toBe(true);
    });
  });
});
