import { renderHook, act } from 'utils/test-utils'
import { addReview, Review } from 'store/slices/reviewSlice'
import getFilteredReviews from 'utils/getFilteredReviews'
import getPageIndexes from 'utils/getPageIndexes'
import getReviewStatistics from 'utils/getReviewStatistics'
import mockReviews from 'mocks/mockReviews'
import { filterByOptions, SortBy } from './Filters'
import useReviews from './useReviews'

describe('useReviews', () => {
  const initialValues = {
    paginatedReviews: [],
    filteredReviews: [],
    statistics: {
      rating: {
        count: 0,
        average: 0,
        distribution: {
          rating1: 0,
          rating1_percentage: 0,
          rating2: 0,
          rating2_percentage: 0,
          rating3: 0,
          rating3_percentage: 0,
          rating4: 0,
          rating4_percentage: 0,
          rating5: 0,
          rating5_percentage: 0,
        },
      },
      recommended_count: 0,
      not_recommended_count: 0,
      recommended_percentage: 0,
      review_count: 0,
    },
    filters: {
      page: 0,
      itemsPerPage: 10,
      sortBy: SortBy.RECENT,
      filterBy: [...filterByOptions],
    },
    onFiltersChange: expect.any(Function),
  }

  it('Should return initial values, when no reviews are provided', () => {
    const { result } = renderHook(() => useReviews())

    expect(result.current).toEqual(initialValues)
  })

  it('Should return new values, when reviews are provided', () => {
    const { store, result } = renderHook(() => useReviews())

    act(() => {
      store.dispatch(addReview(mockReviews[0]))
    })

    let filteredReviews = mockReviews.slice(0, 1)
    let paginatedReviews = mockReviews.slice(0, 1)
    let statistics = getReviewStatistics(mockReviews.slice(0, 1))

    expect(result.current).toEqual({
      ...initialValues,
      filteredReviews,
      paginatedReviews,
      statistics,
    })

    act(() => {
      mockReviews.forEach((review, key) => {
        if (key) {
          store.dispatch(addReview(review))
        }
      })
    })

    filteredReviews = getFilteredReviews({
      reviews: mockReviews,
      sortBy: result.current.filters.sortBy,
      filterBy: result.current.filters.filterBy,
    })
    const { startIndex, endIndex } = getPageIndexes({
      page: result.current.filters.page,
      itemsPerPage: result.current.filters.itemsPerPage,
    })
    paginatedReviews = filteredReviews.slice(startIndex, endIndex)
    statistics = getReviewStatistics(mockReviews)

    expect(result.current).toEqual({
      ...initialValues,
      filteredReviews,
      paginatedReviews,
      statistics,
    })
  })

  it('Should return pagination-values, when onFiltersChange invoked with pagination-values', () => {
    const { store, result } = renderHook(() => useReviews())

    act(() => {
      mockReviews.forEach((review) => {
        store.dispatch(addReview(review))
      })
    })

    const filteredReviews = getFilteredReviews({
      reviews: mockReviews,
      sortBy: result.current.filters.sortBy,
      filterBy: result.current.filters.filterBy,
    })

    expect(result.current.filters.page).toEqual(0)
    expect(result.current.filters.itemsPerPage).toEqual(10)
    expect(result.current.paginatedReviews).toEqual(
      filteredReviews.slice(0, 10)
    )

    act(() => {
      result.current.onFiltersChange({
        page: 1,
        itemsPerPage: 10,
      })
    })

    expect(result.current.paginatedReviews).toEqual(
      filteredReviews.slice(10, 20)
    )

    act(() => {
      result.current.onFiltersChange({
        page: 0,
        itemsPerPage: 25,
      })
    })

    expect(result.current.paginatedReviews).toEqual(
      filteredReviews.slice(0, 25)
    )
  })

  it('Should return filtered-values, when onFiltersChange invoked with filterBy-star-values', () => {
    const { store, result } = renderHook(() => useReviews())

    act(() => {
      mockReviews.forEach((review) => {
        store.dispatch(addReview(review))
      })
    })

    let filterBy = [1]
    act(() => {
      result.current.onFiltersChange({
        filterBy,
      })
    })

    result.current.filteredReviews.forEach((review: Review) => {
      expect(review.rating).toEqual(1)
    })

    filterBy = [3, 4]
    act(() => {
      result.current.onFiltersChange({
        filterBy,
      })
    })

    result.current.filteredReviews.forEach((review: Review) => {
      expect(filterBy.includes(review.rating)).toBeTruthy()
    })
  })

  it('Should return sorted-values, when onFiltersChange invoked with sortBy-values', () => {
    const { store, result } = renderHook(() => useReviews())

    act(() => {
      mockReviews.forEach((review) => {
        store.dispatch(addReview(review))
      })
    })

    let sortBy = SortBy.RECENT
    act(() => {
      result.current.onFiltersChange({
        sortBy,
      })
    })

    result.current.filteredReviews
      .slice(0, result.current.filteredReviews.length - 1)
      .forEach((currentReview: Review, key: number) => {
        const nextReview = result.current.filteredReviews[key + 1] as Review
        expect(currentReview.createdAt >= nextReview.createdAt).toBeTruthy()
      })

    sortBy = SortBy.POSITIVE
    act(() => {
      result.current.onFiltersChange({
        sortBy,
      })
    })

    result.current.filteredReviews
      .slice(0, result.current.filteredReviews.length - 1)
      .forEach((currentReview: Review, key: number) => {
        const nextReview = result.current.filteredReviews[key + 1] as Review
        expect(currentReview.rating >= nextReview.rating).toBeTruthy()
      })

    sortBy = SortBy.NEGATIVE
    act(() => {
      result.current.onFiltersChange({
        sortBy,
      })
    })

    result.current.filteredReviews
      .slice(0, result.current.filteredReviews.length - 1)
      .forEach((currentReview: Review, key: number) => {
        const nextReview = result.current.filteredReviews[key + 1] as Review
        expect(currentReview.rating <= nextReview.rating).toBeTruthy()
      })
  })
})
