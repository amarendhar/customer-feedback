import { render, screen, act, within } from 'utils/test-utils'
import moment from 'moment'
import { addReview } from 'store/slices/reviewSlice'
import mockReviews from 'mocks/mockReviews'
import Reviews from '.'
import getFilteredReviews from 'utils/getFilteredReviews'
import { filterByOptions, SortBy } from './Filters'
import getReviewStatistics from 'utils/getReviewStatistics'

describe('Reviews', () => {
  it('Should render with no statistics, when no reviews are available', () => {
    render(<Reviews />, {
      route: '/reviews',
    })

    screen.getByText('Ratings & Reviews')
    screen.getByText('Write a review')
    screen.getByText('No Ratings Found')
    expect(screen.queryByTestId('reviews-statistics')).not.toBeInTheDocument()
    expect(screen.queryByTestId('reviews-filters')).not.toBeInTheDocument()
    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument()
  })

  it('Should render with statistics, when reviews are available', () => {
    const { store } = render(<Reviews />, {
      route: '/reviews',
    })

    act(() => {
      mockReviews.forEach((review) => {
        store.dispatch(addReview(review))
      })
    })
    const statistics = getReviewStatistics(mockReviews)
    const filteredReviews = getFilteredReviews({
      reviews: mockReviews,
      sortBy: SortBy.RECENT,
      filterBy: [...filterByOptions],
    })

    expect(screen.queryByText('No Ratings Found')).not.toBeInTheDocument()
    screen.getByText('Ratings & Reviews')
    screen.getByText('Write a review')
    screen.getByTestId('reviews-statistics')

    const ratingSummary = screen.getByTestId('rating-summary')
    within(ratingSummary).getByText(statistics.rating.average)
    within(ratingSummary).getByText(`${statistics.rating.count} star ratings`)

    const recommendationSummary = screen.getByTestId('recommendation-summary')
    within(screen.getByTestId('recommend-circle')).getByText(
      statistics.recommended_percentage
    )
    within(recommendationSummary).getByText(
      `${statistics.recommended_percentage}% would recommend`
    )
    within(recommendationSummary).getByText(
      `${statistics.recommended_count} recommendations`
    )

    const ratingHistogram = screen.getByTestId('rating-histogram')
    within(ratingHistogram).getByText('1 star')
    within(ratingHistogram).getByText('2 stars')
    within(ratingHistogram).getByText('3 stars')
    within(ratingHistogram).getByText('4 stars')
    within(ratingHistogram).getByText('5 stars')
    within(screen.getByTestId('histogram-1-stars')).getByText(
      `${statistics.rating.distribution.rating1_percentage}%`
    )
    within(screen.getByTestId('histogram-2-stars')).getByText(
      `${statistics.rating.distribution.rating2_percentage}%`
    )
    within(screen.getByTestId('histogram-3-stars')).getByText(
      `${statistics.rating.distribution.rating3_percentage}%`
    )
    within(screen.getByTestId('histogram-4-stars')).getByText(
      `${statistics.rating.distribution.rating4_percentage}%`
    )
    within(screen.getByTestId('histogram-5-stars')).getByText(
      `${statistics.rating.distribution.rating5_percentage}%`
    )

    screen.getByTestId('reviews-filters')
    screen.getByTestId('reviews-list')

    screen.getByText('Found 10 matching reviews')
    expect(screen.getAllByTestId('review-item').length).toEqual(10)
    screen.getAllByTestId('review-item').forEach((reviewItem, key) => {
      const review = filteredReviews[key]
      within(reviewItem).getByText(review.name)
      within(reviewItem).getByLabelText(
        `${review.rating} ${review.rating === 1 ? 'Star' : 'Stars'}`
      )
      if (review.recommend === true) {
        within(reviewItem).getByTestId('TaskAltOutlinedIcon')
        within(reviewItem).getByText('Would recommend')
      } else if (review.recommend === false) {
        within(reviewItem).getByTestId('CancelOutlinedIcon')
        within(reviewItem).getByText('Would not recommend')
      }
      within(reviewItem).getByText(
        `Reviewed on ${moment(Number(review.createdAt)).format('DD MMM YYYY')}`
      )
      within(reviewItem).getByText(review.comment)
    })
  })
})
