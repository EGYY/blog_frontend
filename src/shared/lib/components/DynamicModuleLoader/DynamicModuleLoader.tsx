import { Reducer } from '@reduxjs/toolkit';
import { FC, memo, PropsWithChildren, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import {
    ReduxStoreManager,
    StateSchema,
    StateSchemaKey,
} from '@/app/providers/StoreProvider';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps extends PropsWithChildren {
    reducers: ReducersList;
    removeAfterAnmount?: boolean;
}
export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = memo(
    (props) => {
        const { children, reducers, removeAfterAnmount = true } = props;
        const store = useStore() as ReduxStoreManager;
        const dispatch = useDispatch();

        useEffect(() => {
            const mountedReducers = store.reducerManager.getReducerMap();

            Object.entries(reducers).forEach(([name, reducer]) => {
                const mounted = mountedReducers[name as StateSchemaKey];
                if (!mounted) {
                    store.reducerManager.add(name as StateSchemaKey, reducer);
                    dispatch({ type: `@INIT ${name} reducer` });
                }
            });

            return () => {
                if (removeAfterAnmount) {
                    Object.entries(reducers).forEach(([name]) => {
                        store.reducerManager.remove(name as StateSchemaKey);
                        dispatch({ type: `@DESTROY ${name} reducer` });
                    });
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>{children}</>
        );
    },
);
