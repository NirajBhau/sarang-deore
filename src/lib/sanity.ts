import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper to fetch the active resume
export async function getActiveResume() {
  const query = `*[_type == "resume" && _id == "active-resume"][0]{
    "url": resumeFile.asset->url,
    lastUpdated
  }`;
  return await client.fetch(query);
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
    }
  }`;
  return await client.fetch(query, { slug });
}
