import moment from 'moment'
import { FilterTypes } from 'pages/Reviews/useReviews'
import { Review } from 'store/slices/reviewSlice'
import { SortBy } from 'pages/Reviews/Filters'

type GetFilteredReviewsProps = {
  reviews: Review[]
  sortBy: FilterTypes['sortBy']
  filterBy: FilterTypes['filterBy']
}

const getFilteredReviews = ({
  reviews,
  sortBy,
  filterBy,
}: GetFilteredReviewsProps) => {
  return [...reviews]
    .sort((a, b) => {
      if (sortBy === SortBy.RECENT) {
        return moment(Number(b.createdAt)).diff(moment(Number(a.createdAt)))
      } else if (sortBy === SortBy.POSITIVE) {
        return b.rating - a.rating
      } else if (sortBy === SortBy.NEGATIVE) {
        return a.rating - b.rating
      }

      return 0
    })
    .filter((review) => filterBy.includes(review.rating))
}

export default getFilteredReviews
