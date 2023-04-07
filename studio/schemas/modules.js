export default {
  name: 'modules',
  title: 'Modules',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Module Name',
      type: 'string',
    },
    {
      name: 'lessonsReferences',
      title: 'Lessons for this module',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'lessons' }] }],
    },
    {

     name: 'classRef',
     title: 'Class Reference',
     type: 'reference',
     to: [{type: 'classes'}],
     
    }
    
    
  ],

  
}