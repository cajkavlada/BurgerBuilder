import { BurgerBuilder } from './BurgerBuilder';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';

import React from 'React';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });
    it('should render <BuilderControls/> elements when receiving ingredients', () => {
        wrapper.setProps({ingredients: {Salad: 0}});
        expect(wrapper.find(BuilderControls)).toHaveLength(1);
    });
});