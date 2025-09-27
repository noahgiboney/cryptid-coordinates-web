import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <main className="flex flex-col items-center gap-6 p-6">
        <Image
          className="rounded-lg shadow-lg"
          src="/dark.png"
          alt="App Logo"
          width={300}
          height={300}
          priority
        />

        <p className="text-2xl font-semibold text-white tracking-wide">
          Explore Haunted Locations
        </p>

        <a
          href="https://apps.apple.com/us/app/cryptid-coordinates/id6478195420"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="hover:opacity-90 transition-opacity"
            src="/app_store.svg"
            alt="Download on the App Store"
            width={160}
            height={50}
          />
        </a>
      </main>
    </div>
  );
}