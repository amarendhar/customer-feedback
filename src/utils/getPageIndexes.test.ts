import getPageIndexes from './getPageIndexes'

describe('getPageIndexes', () => {
  it('Should return index-values for the given values', () => {
    expect(getPageIndexes({ page: 0 })).toEqual({
      startIndex: 0,
      endIndex: 10,
    })
    expect(getPageIndexes({ page: 1 })).toEqual({
      startIndex: 10,
      endIndex: 20,
    })
    expect(getPageIndexes({ page: 2, itemsPerPage: 25 })).toEqual({
      startIndex: 50,
      endIndex: 75,
    })
  })
})
