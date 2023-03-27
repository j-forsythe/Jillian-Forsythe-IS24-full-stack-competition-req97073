export const camelCaseToSentence = (str) => {
  // adding space between strings
  const result = str.replace(/([A-Z])/g, ' $1')

  // converting first character to uppercase and join it to the final string
  const final = result.charAt(0).toUpperCase() + result.slice(1)

  return final
}
