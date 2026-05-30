import { useSelector } from "react-redux";

export function HomePage() {
  const { user, profile } = useSelector((state) => state.auth);
  const displayName = profile?.displayName || user?.username || "Discord User";

  return (
    <main className="flex h-full flex-col bg-[#313338] text-white">
      <header className="flex h-12 shrink-0 items-center border-b border-black/20 px-4 shadow-sm">
        <h1 className="text-sm font-semibold">Friends</h1>
      </header>

      <section className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold">Welcome, {displayName}</h2>
          <p className="mt-2 text-sm text-gray-400">
            Your account is connected. Open your user panel to view or edit profile information.
          </p>
        </div>
      </section>
    </main>
  );
}
