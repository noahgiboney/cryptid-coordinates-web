import Image from "next/image";

export default function LocationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8">
      <Image
        className="rounded-lg shadow-lg"
        src="/dark.png"
        alt="App Logo"
        width={300}
        height={300}
        priority
      />
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
  );
}