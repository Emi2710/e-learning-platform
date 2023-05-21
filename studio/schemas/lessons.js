export default {
  name: 'lessons',
  title: 'Уроки',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название урока',
      type: 'string',
    },
    {
      name: 'slug',
      title:'URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'body',
      title: 'Содержание',
      type: 'blockContent',
    },
    {
     name: 'classRef',
     title: 'Ссылка на класс',
     type: 'reference',
     to: [{type: 'classes'}],
    },
    {
     name: 'moduleref',
     title: 'Ссылка на модуль',
     type: 'reference',
     to: [{type: 'modules'}],
    }
    
    
  ],

  
}