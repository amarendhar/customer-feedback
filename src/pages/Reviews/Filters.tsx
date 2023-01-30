import React, { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import {
  Box,
  Chip,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material'
import { UseReviewsReturnProps } from './useReviews'

type FiltersProps = {
  filters: UseReviewsReturnProps['filters']
  onFiltersChange: UseReviewsReturnProps['onFiltersChange']
}

export enum SortBy {
  RECENT = 'recent',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

const sortByOptions = [
  {
    label: 'Most Recent',
    value: SortBy.RECENT,
  },
  {
    label: 'Positive First',
    value: SortBy.POSITIVE,
  },
  {
    label: 'Negative First',
    value: SortBy.NEGATIVE,
  },
]

export const filterByOptions = [1, 2, 3, 4, 5]

const Filters = ({ filters, onFiltersChange }: FiltersProps) => {
  const onChangeSortBy = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      // @ts-ignore
      onFiltersChange({ sortBy: e.target.value })
    },
    [onFiltersChange]
  )

  const onChangeFilterBy = useCallback(
    (e: SelectChangeEvent<number[]>) => {
      const value = e.target.value
      onFiltersChange({
        filterBy:
          // On autofill we get a stringified value.
          typeof value === 'string'
            ? value.split(',').map((val) => Number(val))
            : value,
      })
    },
    [onFiltersChange]
  )

  return (
    <Container>
      <TextField
        name="sortBy"
        label="Sort by"
        select
        value={filters.sortBy}
        onChange={onChangeSortBy}
      >
        {sortByOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="multiple-checkbox-label">Filter by stars</InputLabel>
        <Select
          id="multiple-checkbox"
          labelId="multiple-checkbox-label"
          multiple
          value={filters.filterBy}
          onChange={onChangeFilterBy}
          input={<OutlinedInput label="Filter by stars" />}
          renderValue={(values) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {values.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {filterByOptions.map((value) => (
            <MenuItem key={value} value={value}>
              <Checkbox checked={filters.filterBy.includes(value)} />
              <ListItemText primary={`${value} stars`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  )
}

export default Filters

const Container = styled.div`
  min-height: 62px;
  padding: ${({ theme }) => theme.space.md}px;
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: ${({ theme }) => theme.space.md}px;
`
