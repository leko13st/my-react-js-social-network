import React from 'react';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { create } from 'react-test-renderer';

describe('ProfileStatus Component', () => {
    test('status from props should be is the state', () => {
        const component = create(<ProfileStatus status='Hello im Stas' />)
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Hello im Stas');
    })

    test('after creation <span> should contains correct status', () => {
        const component = create(<ProfileStatusWithHooks status='Hello im Stas' />)
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    })
})