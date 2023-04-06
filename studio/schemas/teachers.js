export default {
  name: 'teachers',
  title: 'Teachers',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'work',
      title: 'Work',
      type: 'string',
    },
    {
      name: 'imgUrl',
      title: 'Profile picture',
      type: 'string',
    },
    {
      name: 'classReferences',
      title: 'Classes teaching',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'classes' }] }],
    },
    
    
  ],

  
}