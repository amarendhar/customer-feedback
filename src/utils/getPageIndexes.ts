const getPageIndexes = ({
  page = 0,
  itemsPerPage = 10,
}: {
  page?: number
  itemsPerPage?: number
}) => {
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return {
    startIndex,
    endIndex,
  }
}

export default getPageIndexes
