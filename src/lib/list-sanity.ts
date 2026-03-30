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

async function listProjects() {
  const query = `*[_type == "project"]{ _id, title, "slug": slug.current, _createdAt }`;
  const projects = await client.fetch(query);
  console.log("PROJECT_LIST_START");
  console.log(JSON.stringify(projects, null, 2));
  console.log("PROJECT_LIST_END");
}

listProjects();
