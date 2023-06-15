export function transformArray( arr ) {
  return arr.map( ( item ) => ( {
    value : item.id,
    label : item.name
  } ) )
}
