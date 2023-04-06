
import createSchema from 'part:@sanity/base/schema-creator'


import schemaTypes from 'all:part:@sanity/base/schema-type'
import blockContent from './blockContent'
import teachers from './teachers'
import classes from './classes'
import modules from './modules'
import lessons from './lessons'


export default createSchema({
  
  name: 'default',
  
  types: schemaTypes.concat([
    blockContent,

    teachers,
    classes,
    modules,
    lessons,
  ]),
})
