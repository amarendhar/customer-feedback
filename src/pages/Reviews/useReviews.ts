import { useState, useCallback, useMemo } from 'react'
import { useAppSelector } from 'store/hooks'
import { Review, selectReview } from 'store/slices/reviewSlice'
import { filterByOptions, SortBy } from './Filters'
import getPageIndexes from 'utils/getPageIndexes'
import getReviewStatistics from 'utils/getReviewStatistics'
import getFilteredReviews from 'utils/getFilteredReviews'

export type FilterTypes = {
  page: number
  itemsPerPage: number
  sortBy: SortBy
  filterBy: number[]
}

export type Statistics = {
  review_count: number
  rating: {
    count: number
    average: number
    distribution: {
      rating1: number
      rating1_percentage: number
      rating2: number
      rating2_percentage: number
      rating3: number
      rating3_percentage: number
      rating4: number
      rating4_percentage: number
      rating5: number
      rating5_percentage: number
    }
  }
  recommended_count: number
  not_recommended_count: number
  recommended_percentage: number
}

export type UseReviewsReturnProps = {
  filteredReviews: Review[]
  paginatedReviews: Review[]
  statistics: Statistics
  filters: FilterTypes
  onFiltersChange: (value: Partial<FilterTypes>) => void
}

const useReviews = (): UseReviewsReturnProps => {
  const { data: reviews } = useAppSelector(selectReview)
  const [filters, setFilters] = useState({
    page: 0,
    itemsPerPage: 10,
    sortBy: SortBy.RECENT,
    filterBy: [...filterByOptions],
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

  return {
    filteredReviews,
    paginatedReviews,
    statistics,
    filters,
    onFiltersChange,
  }
}

export default useReviews
