import { useMemo } from 'react';

export function Avathar({ avathar }: { avathar: string }) {
  const src = useMemo(() => {
    return `/avathars/${avathar}.png`;
  }, [avathar]);
  return <img className="w-8 h-8 me-2 rounded-full" src={src} alt="a" />;
}
