export default {
  name: 'modules',
  title: 'Модули',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название модуля',
      type: 'string',
    },
    {
      name: 'lessonsReferences',
      title: 'Уроки этого модуля',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'lessons' }] }],
    },
    {

     name: 'classRef',
     title: 'Ссылка на класс',
     type: 'reference',
     to: [{type: 'classes'}],
     
    }
    
    
  ],

  
}