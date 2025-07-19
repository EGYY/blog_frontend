import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getScrollPositions } from '../getScrollPositions/getScrollPositions';

export const getScrollPositionByPath = createSelector(
  getScrollPositions,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
