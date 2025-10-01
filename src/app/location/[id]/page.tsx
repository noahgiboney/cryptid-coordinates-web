import Image from "next/image";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase"; 

type LocationPreview = {
  id: string;
  name: string;
  detail: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log('generateMetadata: Starting metadata generation...');

  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log('generateMetadata: Resolved params - ID:', id);

  try {
    console.log('generateMetadata: Executing Supabase query...'); 
    const { data: location, error }: { data: LocationPreview | null; error: any } = await supabase
      .from("locations")
      .select("id, name, detail")
      .eq("id", id)
      .single();

    console.log('generateMetadata: Supabase response - Data:', location, 'Error:', error);

    if (error) {
      console.error('generateMetadata: Supabase Error Details:', error.message, error.code);
      if (error.code === 'PGRST116') { 
        console.log('generateMetadata: No location found for ID:', id); 
      }
      return {
        title: "Location Not Found",
      };
    }

    if (!location) {
      console.log('generateMetadata: No data returned (null) for ID:', id);
      return {
        title: "Location Not Found",
      };
    }

    console.log('generateMetadata: Location data found:', { id: location.id, name: location.name });

    const title = location.name;
    const description = location.detail.length > 160 
      ? `${location.detail.slice(0, 160)}...` 
      : location.detail;

    console.log('generateMetadata: Generated title:', title, 'Description preview:', description.slice(0, 50) + '...');

    const metadata: Metadata = {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://cryptid-coordinates-web.vercel.app/location/${id}`,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };

    console.log('generateMetadata: Full metadata object:', metadata);
    return metadata;

  } catch (e) {
    console.error('generateMetadata: Unexpected error:', e); // Debug: Catch-all
    return {
      title: "Error Loading Location",
    };
  }
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const { data: location, error }: { data: LocationPreview | null; error: any } = await supabase
      .from("locations")
      .select("id, name, detail")
      .eq("id", id)
      .single();

    if (error || !location) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-8">
          <p>Location not found</p>
        </main>
      );
    }

    const descPreview = location.detail.length > 100 
      ? `${location.detail.slice(0, 100)}...` 
      : location.detail;

    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-4 text-center">
        <Image
        className="rounded-lg shadow-lg"
        src="/dark.png"
        alt="App Logo"
        width={300}
        height={300}
        priority
      />
        <h1 className="text-2xl font-bold">{location.name}</h1>
        <p className="text-lg max-w-md">{descPreview}</p>
        <p className="text-gray-400">View more on the app</p>
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
  } catch (e) {
    console.error('LocationPage: Unexpected error:', e);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8">
        <p>Error loading location</p>
      </main>
    );
  }
}