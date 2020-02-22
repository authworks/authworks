export function snakeToCamel(value: any) {
  return value.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  )
}

export function camelToSnake(value: any) {

}
