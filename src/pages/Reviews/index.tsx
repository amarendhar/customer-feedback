import React from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Button,
  Rating,
  Typography,
  CircularProgress,
  Tooltip,
  Link,
  Card,
  CardContent,
} from '@mui/material'
import { TaskAltOutlined, CancelOutlined } from '@mui/icons-material'
import useReviews, { Statistics } from './useReviews'
import { Pagination } from 'components'
import Filters, { filterByOptions } from './Filters'

type Distribution = Statistics['rating']['distribution']

const Reviews = () => {
  const {
    paginatedReviews,
    filteredReviews,
    statistics,
    filters,
    onFiltersChange,
  } = useReviews()

  return (
    <Container>
      <Typography fontSize={23} fontWeight="bold" p="15px">
        Ratings & Reviews
      </Typography>
      {statistics.review_count > 0 ? (
        <>
          <ReviewStatistics data-testid="reviews-statistics">
            <ReviewsDashboard>
              <RatingSummary data-testid="rating-summary">
                <Typography fontSize={40} fontWeight="bold">
                  {statistics.rating.average}
                </Typography>
                <Rating size="large" name="rating" value={4.4} readOnly />
                <Typography fontSize={14}>
                  {statistics.rating.count} star ratings
                </Typography>
              </RatingSummary>
              <RecommendationSummary data-testid="recommendation-summary">
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgressGrey
                    variant="determinate"
                    value={100}
                    size={55}
                    sx={{
                      color: 'rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={statistics.recommended_percentage}
                    size={55}
                    // ToDo: change color to red for `< 50` etc..
                    color="success"
                  />
                  <CircularText data-testid="recommend-circle">
                    <Typography fontSize={16}>
                      {statistics.recommended_percentage}
                    </Typography>
                  </CircularText>
                </Box>
                <Typography fontSize={16} fontWeight="bold" pt="3px">
                  {statistics.recommended_percentage}% would recommend
                </Typography>
                <Typography fontSize={14} pt="8px">
                  {statistics.recommended_count} recommendations
                </Typography>
              </RecommendationSummary>
            </ReviewsDashboard>
            <RatingHistogram data-testid="rating-histogram">
              {[...filterByOptions].reverse().map((val) => (
                <Tooltip
                  key={val}
                  arrow
                  title={`Filter only by ${val} stars`}
                  PopperProps={ToolTipPopperProps}
                  disableInteractive
                >
                  <Link
                    data-testid={`histogram-${val}-stars`}
                    component="button"
                    color="inherit"
                    onClick={() => {
                      onFiltersChange({
                        filterBy: [val],
                      })
                    }}
                  >
                    <Typography fontSize="12px" width="13%">
                      {val}&nbsp;{val === 1 ? 'star' : 'stars'}
                    </Typography>
                    <HistogramProgressBar
                      percentage={
                        statistics.rating.distribution[
                          `rating${val}_percentage` as keyof Distribution
                        ]
                      }
                    >
                      <div />
                    </HistogramProgressBar>
                    <Typography fontSize="12px" width="11%">
                      {
                        statistics.rating.distribution[
                          `rating${val}_percentage` as keyof Distribution
                        ]
                      }
                      %
                    </Typography>
                  </Link>
                </Tooltip>
              ))}
            </RatingHistogram>
          </ReviewStatistics>
          <NavLink to="/">
            <Button
              variant="outlined"
              sx={{
                m: '30px',
              }}
            >
              Write a review
            </Button>
          </NavLink>
          <Filters filters={filters} onFiltersChange={onFiltersChange} />
          <ReviewsContainer>
            <Typography fontSize="16px" mt="20px">
              Found {paginatedReviews.length} matching reviews
            </Typography>
            <ReviewsList data-testid="reviews-list">
              {paginatedReviews.map((review) => (
                <StyledCard key={review.id} data-testid="review-item">
                  <CardContent>
                    <Typography fontSize="18px" fontWeight="bold">
                      {review.name}
                    </Typography>
                    <CardSummary>
                      <Rating
                        size="small"
                        name="rating"
                        value={review.rating}
                        readOnly
                      />
                      {review.recommend !== undefined && (
                        <CardRecommendation>
                          {review.recommend ? (
                            <TaskAltOutlined color="success" />
                          ) : (
                            <CancelOutlined color="error" />
                          )}
                          <Typography fontSize="14px" fontWeight="bold">
                            {review.recommend
                              ? 'Would recommend'
                              : 'Would not recommend'}
                          </Typography>
                        </CardRecommendation>
                      )}
                    </CardSummary>
                    <Typography fontSize="12px" mt="4px" data-testid="date">
                      Reviewed on&nbsp;
                      {moment(Number(review.createdAt)).format('DD MMM YYYY')}
                    </Typography>
                    <Typography fontSize="14px" mt="16px">
                      {review.comment}
                    </Typography>
                  </CardContent>
                </StyledCard>
              ))}
            </ReviewsList>
            <Pagination
              count={filteredReviews.length}
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          </ReviewsContainer>
        </>
      ) : (
        <>
          <Typography>No Reviews Found</Typography>
          <NavLink to="/">
            <Button
              variant="outlined"
              sx={{
                m: '30px',
              }}
            >
              Write a review
            </Button>
          </NavLink>
        </>
      )}
    </Container>
  )
}

export default Reviews

export const ToolTipPopperProps = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, -10],
      },
    },
  ],
}

const Container = styled.div`
  padding: ${({ theme }) => `0 ${theme.space.lg}px`};
  text-align: center;
`

const ReviewStatistics = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: ${({ theme }) => `${theme.space.xxl}px 0`};
  grid-gap: ${({ theme }) => theme.space.xxl}px;
`

const ReviewsDashboard = styled.div`
  max-width: 375px;
  display: flex;
  grid-gap: ${({ theme }) => theme.space.md}px;
`

const RatingHistogram = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  grid-gap: ${({ theme }) => theme.space.sm}px;

  button {
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: none;
    }
  }
`

const RatingSummary = styled.div`
  text-align: center;
`

const RecommendationSummary = styled.div`
  text-align: center;
`

const AbsoluteCenter = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CircularProgressGrey = styled(CircularProgress)`
  ${AbsoluteCenter};
`

const CircularText = styled.div`
  ${AbsoluteCenter};
`

const HistogramProgressBar = styled.div<{ percentage: number }>`
  flex-grow: 1;
  border-radius: 4px;
  background-color: rgb(247, 247, 247);
  height: 8px;

  > div {
    width: ${({ percentage }) => percentage}%;
    height: 100%;
    background-color: rgb(0, 131, 0);
    border-radius: 4px;
  }
`

const ReviewsContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.space.xxl}px;
`

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space.xxl}px;
  grid-gap: ${({ theme }) => theme.space.lg}px;
`

const StyledCard = styled(Card)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 0;
  text-align: left;
`

const CardSummary = styled.div`
  display: flex;
  align-items: center;
  grid-gap: ${({ theme }) => theme.space.lg}px;
  margin-top: ${({ theme }) => theme.space.md}px;
`

const CardRecommendation = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: ${({ theme }) => theme.space.lg}px;
  grid-gap: ${({ theme }) => theme.space.sm}px;
`
