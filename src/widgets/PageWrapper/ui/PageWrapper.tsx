import {
    FC,
    MutableRefObject,
    PropsWithChildren,
    UIEvent,
    useEffect,
    useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getScrollPositionByPath,
    saveScrollPostitionActions,
} from '@/features/SaveScrollPostition';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';

import cls from './PageWrapper.module.scss';

interface PageWrapperProps extends PropsWithChildren {
    onScrollEnd?: () => void;
    needAutoScroll?: boolean;
    'data-testid'?: string;
}

export const PageWrapper: FC<PageWrapperProps> = (props) => {
    const { children, onScrollEnd, needAutoScroll } = props;
    const dispatch = useAppDispatch();
    const location = useLocation();
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const scrollTopPosition = useSelector((state: StateSchema) =>
        getScrollPositionByPath(state, location.pathname),
    );

    useEffect(() => {
        if (needAutoScroll) {
            wrapperRef.current.scrollTop = scrollTopPosition;
        }
    }, [needAutoScroll, scrollTopPosition]);

    useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        const scrollTopPosition = e.currentTarget.scrollTop;
        dispatch(
            saveScrollPostitionActions.setScrollPostition({
                path: location.pathname,
                position: scrollTopPosition,
            }),
        );
    }, 500);

    return (
        <section
            ref={wrapperRef}
            className={cls.content}
            onScroll={onScroll}
            data-testid={props?.['data-testid'] ?? 'page'}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </section>
    );
};
