import { useEffect, type DependencyList } from 'react';

export function useAppEffect(callback: () => void, deps: DependencyList = []) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
