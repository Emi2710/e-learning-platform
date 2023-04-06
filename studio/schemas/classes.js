export default {
  name: 'classes',
  title: 'Classes',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Class Name',
      type: 'string',
    },
    {
      name: 'studying',
      title: 'Studying subject',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'string',
    },
    {
      name: 'studentsNumber',
      title: 'Students Number',
      type: 'number',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'modulesReferences',
      title: 'Modules studying',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'modules' }] }],
    },
    {

     name: 'classTeacher',
     title: 'Class Teacher',
     type: 'reference',
     to: [{type: 'teachers'}],
     
    }
    
    
  ],

  
}