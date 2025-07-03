import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = { children: ReactNode, root?: HTMLElement | null };

export function Portal({ children, root = document.getElementById('app') || document.getElementById('root') }: PortalProps) {
  const el = document.createElement('div');

  useEffect(() => {
    root?.appendChild(el);
    return () => { root?.removeChild(el); };
  }, [el, root]);

  return createPortal(children, el);
}
