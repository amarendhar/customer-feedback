import React, { useCallback } from 'react'
import { TablePagination } from '@mui/material'
import { UseReviewsReturnProps } from 'pages/Reviews/useReviews'

type PaginationProps = {
  count: number
  filters: UseReviewsReturnProps['filters']
  onFiltersChange: UseReviewsReturnProps['onFiltersChange']
}

const Pagination = ({ count, filters, onFiltersChange }: PaginationProps) => {
  const handleChangePage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
      onFiltersChange({
        page,
      })
    },
    [onFiltersChange]
  )

  const handleChangeItemsPerPage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onFiltersChange({
        page: 0,
        itemsPerPage: Number(e.target.value),
      })
    },
    [onFiltersChange]
  )

  return (
    <TablePagination
      labelRowsPerPage="Reviews/Page"
      labelDisplayedRows={({ from, to, count }) =>
        `Displaying ${from}–${to} Reviews of ${count}`
      }
      component="div"
      count={count}
      page={filters.page}
      rowsPerPage={filters.itemsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeItemsPerPage}
      sx={{
        mt: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}

export default Pagination
