import { createSelector } from '@reduxjs/toolkit';

import { getScrollPositions } from '../getScrollPositions/getScrollPositions';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollPositionByPath = createSelector(
    getScrollPositions,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
