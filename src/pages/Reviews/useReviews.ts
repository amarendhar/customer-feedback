import { useState, useCallback, useMemo } from 'react'
import { useAppSelector } from 'store/hooks'
import { Review, selectReview } from 'store/slices/reviewSlice'
import { filterByOptions, SortBy } from './Filters'
import getPageIndexes from 'utils/getPageIndexes'
// import mockReviews from 'mocks/mockReviews'
import getReviewStatistics, { initialStatistics } from 'utils/getReviewStatistics'
import getFilteredReviews from 'utils/getFilteredReviews'

export type FilterTypes = {
  page: number
  itemsPerPage: number
  sortBy: SortBy
  filterBy: number[]
}

export type UseReviewsReturnProps = {
  paginatedReviews: Review[]
  filteredReviews: Review[]
  statistics: typeof initialStatistics
  filters: FilterTypes
  onFiltersChange: (value: Partial<FilterTypes>) => void
}

const useReviews = (): UseReviewsReturnProps => {
  const { data: reviews } = useAppSelector(selectReview)
  // const [reviews, setReviews] = useState(mockReviews)
  const [filters, setFilters] = useState({
    page: 0,
    itemsPerPage: 10,
    sortBy: SortBy.RECENT,
    filterBy: filterByOptions,
  })

  const statistics = useMemo(() => getReviewStatistics(reviews), [reviews])

  const onFiltersChange = useCallback((value: Partial<FilterTypes>) => {
    setFilters((v) => ({ ...v, ...value }))
  }, [])

  const filteredReviews = useMemo(() => {
    return getFilteredReviews({
      reviews,
      sortBy: filters.sortBy,
      filterBy: filters.filterBy,
    })
  }, [reviews, filters.sortBy, filters.filterBy])

  const paginatedReviews = useMemo(() => {
    const { startIndex, endIndex } = getPageIndexes({
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
    })

    return filteredReviews.slice(startIndex, endIndex)
  }, [filters.page, filters.itemsPerPage, filteredReviews])

  return { paginatedReviews: paginatedReviews, filteredReviews, statistics, filters, onFiltersChange }
}

export default useReviews
