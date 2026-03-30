import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './src/sanity/schema';
import { FileText } from 'lucide-react';

export default defineConfig({
  name: 'default',
  title: 'Sarang Deore Portfolio',

  // IMPORTANT: Replace with your actual Project ID from sanity.io/manage
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Projects list
            S.listItem()
              .title('Projects')
              .child(S.documentTypeList('project').title('Projects')),
            
            S.divider(),

            // Resume Singleton
            S.listItem()
              .title('Resume Management')
              .id('resumeManagement')
              .icon(FileText as any)
              .child(
                S.document()
                  .schemaType('resume')
                  .documentId('active-resume')
                  .title('Active Resume')
              ),
            
            // Other types (if any)
            ...S.documentTypeListItems().filter(
              (listItem) => !['project', 'resume'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
});
