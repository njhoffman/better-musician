import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SongsList from './SongsList';

const setup = (propOverrides) => {

    const props = Object.assign({
        songs: [],
        onSongClick: jest.fn()
    }, propOverrides);

    const renderer = TestUtils.createRenderer();
    renderer.render(<SongsList {...props} />)
    const output = renderer.getRenderOutput();

    return {
        output: output,
        props: props
    };
};

describe('components', () => {
    describe('song list', () => {
        it('should render ok', () => {
            const { output } = setup();
            expect(output.type).toBe('ul');
        });
    });
});
