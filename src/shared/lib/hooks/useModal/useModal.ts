import { useCallback, useEffect, useRef, useState } from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay?: number;
}

export function useModal({
    animationDelay = 300,
    isOpen,
    onClose,
}: UseModalProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        } else if (!isOpen && isMounted) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                setIsMounted(false);
                setIsClosing(false);
            }, animationDelay);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isOpen, animationDelay, isMounted]);

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
                setIsMounted(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close],
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
    };
}
