import Image from "next/image";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase"; 
type LocationPreview = {
  id: string;
  name: string;
  detail: string;
  imageUrl: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: location } = await supabase
    .from("locations") 
    .select("id, name, detail, image_url as imageUrl")
    .eq("id", id)
    .single() as { data: LocationPreview | null };

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const title = location.name;
  const description = location.detail.length > 160 
    ? `${location.detail.slice(0, 160)}...` 
    : location.detail;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [location.imageUrl],
      url: `https://cryptid-coordinates-web.vercel.app/location/${params.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [location.imageUrl],
    },
  };
}

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