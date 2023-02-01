import { filterByOptions } from 'pages/Reviews/Filters'
import { Review } from 'store/slices/reviewSlice'
import { Statistics } from 'pages/Reviews/useReviews'

type Distribution = Statistics['rating']['distribution']

const getReviewStatistics = (reviews: Review[]): Statistics => {
  const stats = {
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
    review_count: reviews.length,
  }

  reviews.forEach((val) => {
    stats.rating.count += val.rating
    stats.rating.distribution[`rating${val.rating}` as keyof Distribution] += 1

    if (val.recommend === true) {
      stats.recommended_count += 1
    } else if (val.recommend === false) {
      stats.not_recommended_count += 1
    }
  })

  const ratingAverage = Number(
    (
      filterByOptions.reduce((acc, val) => {
        acc +=
          stats.rating.distribution[`rating${val}` as keyof Distribution] * val
        return acc
      }, 0) / stats.review_count
    ).toFixed(1)
  )

  return {
    ...stats,
    rating: {
      ...stats.rating,
      average: isNaN(ratingAverage) ? 0 : ratingAverage,
      distribution: {
        ...stats.rating.distribution,
        ...filterByOptions.reduce((acc, val) => {
          const percentage = Math.floor(
            (stats.rating.distribution[`rating${val}` as keyof Distribution] /
              stats.review_count) *
              100
          )
          acc[`rating${val}_percentage` as keyof Distribution] = isNaN(
            percentage
          )
            ? 0
            : percentage
          return acc
        }, {} as Distribution),
      },
    },
    recommended_percentage: Math.ceil(
      (stats.recommended_count /
        (stats.recommended_count + stats.not_recommended_count || 1)) *
        100
    ),
  }
}

export default getReviewStatistics
