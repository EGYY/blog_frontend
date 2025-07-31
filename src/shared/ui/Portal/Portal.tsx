import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = { children: ReactNode, root?: HTMLElement | null };

export const Portal = (props: PortalProps) => {
  const {
    children,
    root = document.getElementById('app') || document.getElementById('root'),
  } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!containerRef.current) {
    containerRef.current = document.createElement('div');
    containerRef.current.setAttribute('data-portal', 'true');
    root?.appendChild(containerRef.current);
  }

  useEffect(() => {
    const container = containerRef.current!;
    return () => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  return createPortal(children, containerRef.current);
};
