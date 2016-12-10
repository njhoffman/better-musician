import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Song from './Song';

const setup = (propOverrides) => {

    const props = Object.assign({
        onClick: jest.fn(),
        completed: false,
        title: ''
    }, propOverrides);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Song {...props} />)
    const output = renderer.getRenderOutput();

    return {
        output: output,
        props: props
    };
};

describe('components', () => {
    describe('song', () => {
        it('should render ok', () => {
            const { output } = setup();
            expect(output.type).toBe('li');
        });
    });
});
