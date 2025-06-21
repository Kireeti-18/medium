export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center pointer-events-auto">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600"></div>
    </div>
  );
}
