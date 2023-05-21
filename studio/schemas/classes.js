export default {
  name: 'classes',
  title: 'Классы',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Имя классы',
      type: 'string',
    },
    {
      name: 'classIdentifier',
      title: 'Логин классы',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'URL классы',
      type: 'slug',
      options: {
        source: 'classIdentifier',
        maxLength: 96,
      },
    },
    {
      name: 'studying',
      title: 'Предмет изучения',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Дата начала',
      type: 'string',
    },
    {
      name: 'endDate',
      title: 'Дата окончания',
      type: 'string',
    },
    {
      name: 'studentsNumber',
      title: 'Количество студентов',
      type: 'number',
    },
    {
      name: 'password',
      title: 'Пароль',
      type: 'string',
    },
    {
      name: 'modulesReferences',
      title: 'Изучаемые модули',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'modules' }] }],
    },
    {

     name: 'classTeacher',
     title: 'Учитель',
     type: 'reference',
     to: [{type: 'teachers'}],
     
    }
    
    
  ],

  
}