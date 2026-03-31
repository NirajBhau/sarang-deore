import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., MATERIAL SCIENCE / STRUCTURAL ENGINEERING',
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Used for project cards on the home page.',
    }),
    defineField({
      name: 'fullDesc',
      title: 'Full Overview',
      type: 'text',
      rows: 10,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'impact',
      title: 'Impact Statement',
      type: 'string',
      description: 'e.g., 82% Absorption Drop',
    }),
    defineField({
      name: 'role',
      title: 'Project Role',
      type: 'string',
      description: 'e.g., Primary Researcher',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'statusTag',
      title: 'Status Tag',
      type: 'string',
      description: 'e.g., COMPLETED, PROTOTYPE',
      initialValue: 'COMPLETED'
    }),
    defineField({
      name: 'grade',
      title: 'Grade/Recognition',
      type: 'string',
    }),
    defineField({
      name: 'researchSignificance',
      title: 'Research Significance',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'keyHighlights',
      title: 'Key Technical Highlights',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
        name: 'technicalTools',
        title: 'Technical Tools',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              { name: 'name', type: 'string', title: 'Tool Name' },
              { name: 'description', type: 'string', title: 'Description' },
              { name: 'icon', type: 'string', title: 'Icon (Lucide Name)', description: 'e.g. Code, Database, Radar' }
            ]
          })
        ]
    }),
    defineField({
        name: 'methodology',
        title: 'Project Methodology',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Title' },
              { name: 'description', type: 'string', title: 'Description' },
              { name: 'value', type: 'string', title: 'Value' },
              { name: 'unit', type: 'string', title: 'Unit' },
              { name: 'icon', type: 'string', title: 'Icon (Lucide Name)' }
            ]
          })
        ]
    }),
    defineField({
      name: 'labResultsImage',
      title: 'Lab Results / Gallery Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'galleryImages',
      title: 'Project Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),
    defineField({
      name: 'pptFile',
      title: 'Main Presentation (PPTX)',
      type: 'file',
      options: { accept: '.pptx,.ppt' }
    }),
    defineField({
      name: 'resources',
      title: 'Additional Resources',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Resource Name' },
            { name: 'file', type: 'file', title: 'File' },
            { name: 'type', type: 'string', title: 'File Type', options: { list: ['pdf', 'docx', 'xlsx', 'other'] } }
          ]
        })
      ]
    })
  ],
});
