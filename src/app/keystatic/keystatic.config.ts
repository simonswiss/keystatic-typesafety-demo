import { collection, config, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      path: 'content/posts/*',
      slugField: 'title',
      schema: {
        // The slug is automatically generated (but editable)
        // from the title field
        title: fields.slug({
          name: {
            label: 'Title',
          },
        }),
        draft: fields.checkbox({ label: 'draft' }),
        id: fields.integer({ label: 'ID' }),
        date: fields.date({ label: 'Date' }),

        // Instead of just a string, this is a relationship
        // to entries from the `authors` collection.
        authors: fields.array(
          fields.relationship({
            label: 'Author',
            collection: 'authors',
            validation: {
              isRequired: true,
            },
          }),
          {
            label: 'Authors',
            itemLabel: (props) => props.value ?? 'Please select',
          }
        ),
        description: fields.text({ label: 'Description', multiline: true }),
        // We define in which directory the images are being stored,
        // as well as what `publicPath` they should have
        // for ease of use.
        image: fields.image({
          label: 'Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),

        // Instead of just a string, this is a relationship
        // to entries from the `categories` collection.
        categories: fields.array(
          fields.relationship({
            label: 'Category',
            collection: 'categories',
            validation: {
              isRequired: true,
            },
          }),
          {
            label: 'Categories',
            itemLabel: (props) => props.value ?? 'Please select',
          }
        ),
      },
    }),

    categories: collection({
      label: 'Categories',
      path: 'content/categories/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
      },
    }),

    authors: collection({
      label: 'Authors',
      path: 'content/authors/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
      },
    }),
  },
})

// Below is the user's schema using Netlify CMS and Contentlayer — this should be easy to port over to Keystatic 👍

//  name: 'Post',
//     filePathPattern: `**/*.md`,
//     contentType: 'markdown',
//     fields: {
//       title: {
//         type: 'string',
//         required: true,
//       },
//       date: {
//         type: 'date',
//         required: true,
//       },
//       author:{
//         type: 'string',
//         required: true,
//       },

//       description:{
//         type: 'string',
//         required: true,
//       },
//       slug:{
//         type: 'string',
//       },
//       id:{
//         type: 'number',
//         required: false,
//       },
//       image:{
//         type: 'string',
//       },
//       draft:{
//         type: 'boolean',
//         required: true,
//       },
//       tags: {
//         type: 'list',
//         of: { type: 'string' }
//       },
//       categories:{
//         type: 'list',
//         of: { type: 'string' },
//       }

//     },
//     computedFields: {
//       slug: {
//         type: "string",
//         resolve: (doc) => doc._raw.sourceFileName.replace(/\.md/, ""),
//       },
//     }
