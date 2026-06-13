export function FriendsEmptyState({ displayName }) {
  return (
    <main className="flex h-full flex-col bg-chat-bg text-primary-text">
      <header className="flex h-12 shrink-0 items-center border-b border-black/20 px-4 shadow-sm">
        <h1 className="text-sm font-semibold">Friends</h1>
      </header>
      <section className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold">Welcome, {displayName}</h2>
          <p className="mt-2 text-sm text-muted-text">
            Select a server and channel on the left to start chatting.
          </p>
        </div>
      </section>
    </main>
  );
}
