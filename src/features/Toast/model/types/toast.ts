export type ToastType = 'default' | 'success' | 'error' | 'warning';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

export interface ToastSchema {
    items: Toast[];
}
