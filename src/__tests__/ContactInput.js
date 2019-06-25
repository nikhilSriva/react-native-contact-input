import React from 'react';
import {shallow} from 'enzyme';
import ContactInput from '../Component/Input';
import renderer from 'react-test-renderer';

    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = renderer.create(<ContactInput style={{width: 200}}
                                                           onChange={(value) => console.log(value)}/>)

        });
    });