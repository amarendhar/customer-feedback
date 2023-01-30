import { filterByOptions } from 'pages/Reviews/Filters'
import { Review } from 'store/slices/reviewSlice'

export const initialStatistics = {
  review_count: 0,
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
}

const getReviewStatistics = (reviews: Review[]) => {
  const stats = {
    ...initialStatistics,
    review_count: reviews.length,
  }

  // console.log(stats)
  reviews.forEach((val) => {
    stats.rating.count += val.rating
    stats.rating.distribution[
      `rating${val.rating}` as keyof typeof stats.rating.distribution
    ] += 1

    if (val.recommend === true) {
      stats.recommended_count += 1
    } else if (val.recommend === false) {
      stats.not_recommended_count += 1
    }
  })

  return {
    ...stats,
    rating: {
      ...stats.rating,
      average: Number(
        (
          filterByOptions.reduce((acc, val) => {
            acc +=
              stats.rating.distribution[
                `rating${val}` as keyof typeof stats.rating.distribution
              ] * val
            return acc
          }, 0) / stats.review_count
        ).toFixed(1)
      ),
      distribution: {
        ...stats.rating.distribution,
        ...filterByOptions.reduce((acc, val) => {
          acc[
            `rating${val}_percentage` as keyof typeof stats.rating.distribution
          ] = Math.ceil(
            (stats.rating.distribution[
              `rating${val}` as keyof typeof stats.rating.distribution
            ] /
              stats.review_count) *
              100
          )
          return acc
        }, {} as typeof stats.rating.distribution),
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
