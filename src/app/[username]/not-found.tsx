import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="text-6xl animate-pixel-bounce">🤖</div>
      <div className="space-y-2">
        <h1 className="font-pixel text-xl text-ink">404</h1>
        <p className="font-pixel text-xs text-muted">PAGE NOT FOUND</p>
        <p className="text-muted text-sm font-body mt-2">This page doesn't exist — yet.</p>
      </div>
      <Link href="/" className="px-6 py-3 border-[3px] border-ink font-pixel text-xs text-white bg-accent shadow-pixel hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
        GO HOME
      </Link>
    </main>
  );
}
