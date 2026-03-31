import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'n2iakfs0',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getActiveResume() {
  // Query looks for any document of type "resume", prioritizing the most recently updated.
  // We fetch the entire asset reference to ensure we can debug if url is missing.
  const query = `*[_type == "resume"] | order(_updatedAt desc)[0]{
    "url": resumeFile.asset->url,
    resumeFile,
    lastUpdated
  }`;
  
  try {
    // Always fetch with useCdn: false for high-importance files like resume
    const data = await client.fetch(query, {}, { useCdn: false });
    console.log("Sanity getActiveResume Response:", data);
    return data;
  } catch (error) {
    console.error("Sanity getActiveResume Error:", error);
    return null;
  }
}

// Helper to fetch all projects
export async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc){
    ...,
    "thumbnailUrl": thumbnail.asset->url,
    "labResultsUrl": labResultsImage.asset->url,
    "pptUrl": pptFile.asset->url,
    "resources": resources[]{
      name,
      type,
      "url": file.asset->url
    },
    "galleryImages": galleryImages[]{
      ...,
      "url": asset->url
    }
  }`;
  return await client.fetch(query);
}

// Helper to fetch a single project by slug
export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    ...,
    "thumbnailUrl": thumbnail.asset->url,
    "labResultsUrl": labResultsImage.asset->url,
    "pptUrl": pptFile.asset->url,
    "resources": resources[]{
      name,
      type,
      "url": file.asset->url
    },
    "galleryImages": galleryImages[]{
      ...,
      "url": asset->url
    }
  }`;
  return await client.fetch(query, { slug });
}
