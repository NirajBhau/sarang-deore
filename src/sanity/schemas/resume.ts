import { defineType, defineField } from 'sanity';
import { FileText } from 'lucide-react';

export default defineType({
  name: 'resume',
  title: 'Active Resume',
  type: 'document',
  icon: FileText as any,
  fields: [
    defineField({
      name: 'title',
      title: 'Resume Title',
      type: 'string',
      initialValue: 'Academic & Professional CV',
      readOnly: true,
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF File',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      validation: Rule => Rule.required(),
      description: 'Upload the latest version of your resume here. This will update the download link across the site.',
    }),
    defineField({
        name: 'lastUpdated',
        title: 'Last Updated',
        type: 'datetime',
        initialValue: (new Date()).toISOString(),
        options: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: 'HH:mm',
        }
    })
  ],
});
