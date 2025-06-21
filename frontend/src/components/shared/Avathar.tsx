export function Avathar({ avathar }: { avathar: string }) {
  return (
    <img
      className="w-8 h-8 me-2 rounded-full"
      src={`public/avathars/${avathar}.png`}
      alt=""
    />
  );
}
