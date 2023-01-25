import reviewReducer, {
  initialState,
  addReview,
  removeReview,
} from './reviewSlice'

describe(`Review Reducer`, () => {
  it(`Should handle initial state`, () => {
    expect(reviewReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it(`Should add/remove items to/from review-slice`, () => {
    const item1 = {
      id: 'id1',
      name: 'Amar',
      email: 'amar@gmail.com',
      rating: 4,
      comment: `Nice product, I'll definitely recommend it to a friend`,
      submitted_at: 'dd/mm/yy',
    }
    let state = reviewReducer(initialState, addReview(item1))
    expect(state).toEqual({ data: [item1] })

    const item2 = { ...item1, id: 'id2' }
    state = reviewReducer(state, addReview(item2))
    expect(state).toEqual({ data: [item1, item2] })

    state = reviewReducer(state, removeReview(item2.id))
    expect(state).toEqual({
      data: [item1],
    })

    state = reviewReducer(state, removeReview(item1.id))
    expect(state).toEqual({
      data: [],
    })
  })
})
