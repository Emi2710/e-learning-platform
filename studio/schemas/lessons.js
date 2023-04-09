export default {
  name: 'lessons',
  title: 'Lessons',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Lesson Name',
      type: 'string',
    },
    {
      name: 'slug',
      title:'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
     name: 'classRef',
     title: 'Class Reference',
     type: 'reference',
     to: [{type: 'classes'}],
    },
    {
     name: 'moduleref',
     title: 'Module Ref',
     type: 'reference',
     to: [{type: 'modules'}],
    }
    
    
  ],

  
}