export default {
  name: 'teachers',
  title: 'Учителя',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
    },
    {
      name: 'work',
      title: 'Работа',
      type: 'string',
    },
    {
      name: 'imgUrl',
      title: 'Аватар',
      type: 'image',
    },
    {
      name: 'classReferences',
      title: 'Преподаваемые классы',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'classes' }] }],
    },
    
    
  ],

  
}