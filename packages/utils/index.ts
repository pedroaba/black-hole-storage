export function getInitialLettersOfUsername(username?: string) {
  return (
    username
      ?.split(' ')
      .reduce((acc, name) => {
        return acc.concat(name[0]!)
      }, '')
      .slice(0, 2) ?? 'UU'
  )
}
