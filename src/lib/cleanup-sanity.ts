import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: 'n2iakfs0',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_AUTH_TOKEN, 
  useCdn: false,
});

async function cleanupDuplicates() {
  console.log("Starting Sanity Cleanup...");
  
  // List all projects to identify which ones to keep vs delete
  // We keep the ones created today (2026-03-30) or those with our clean IDs
  const query = `*[_type == "project"]{ _id, title, _createdAt, "slug": slug.current }`;
  const projects = await client.fetch(query);
  
  const idsToDelete: string[] = [];
  const slugsSeen = new Set();
  
  // We sort by creation date descending to keep the newest ones (Advanced ones)
  const sortedProjects = projects.sort((a: any, b: any) => 
    new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );
  
  for (const p of sortedProjects) {
    if (slugsSeen.has(p.slug)) {
      console.log(`Duplicate found for slug "${p.slug}": Deleting ID ${p._id}`);
      idsToDelete.push(p._id);
    } else {
      console.log(`Keeping most recent version for slug "${p.slug}": ID ${p._id}`);
      slugsSeen.add(p.slug);
    }
  }

  if (idsToDelete.length === 0) {
    console.log("No duplicates found to delete.");
    return;
  }

  console.log(`Deleting ${idsToDelete.length} duplicate documents...`);
  
  let transaction = client.transaction();
  idsToDelete.forEach(id => {
    transaction = transaction.delete(id);
  });
  
  await transaction.commit();
  console.log("✅ Cleanup complete.");
}

cleanupDuplicates();
