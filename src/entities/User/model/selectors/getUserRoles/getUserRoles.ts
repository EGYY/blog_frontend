import { createSelector } from '@reduxjs/toolkit';

import { getUser } from '../getUser/getUser';

export const getUserRoles = createSelector(getUser, (user) => user?.role);
