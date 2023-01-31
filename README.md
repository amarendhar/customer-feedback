## The project is deployed on Vercel

- [https://customer-feedback-kappa.vercel.app](https://customer-feedback-kappa.vercel.app)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### Project Description

- It has two pages
  - `Home/Write Review` page is to add review to the reviews-list.
    - It has `Feedback-Form` with fields `Name, Email, Rating, Comment and Recommend` and `Submit Feedback` button.
    - All fields are required except `Recommend` field.
    - `Rating` field has 5-star-icons, on-hover of every-star-icon shows associated value on right side, and on-click of any-star-icon sets the rating-value.
    - All fields provide `validation-error-messages` on change-values or submit form.
    - `on-submit` feedback, the app navigates to `All Reviews` page.
    - For viewport `>768` devices, the Feedback-Form renders in two-columns, where `Name, Email & Rating` are on first-column, and `Comment, Recommend & Submit-Feedback-Button` on second-column.
    - For viewport `<=768` devices, the Feedback-Form renders in 1-column in the order of `Name, Email, Rating, Comment, Recommend & Submit-Feedback-Button`.
  - `All Reviews` page is to show reviews-list with statistics, filters and pagination.
    - It has five-sections vertically, which are `Statistics, Write Review Navigation Button, Filters, Reviews List & Pagination`.
    - `Statistics` has three sections horizontally, which are `Rating Summary, Recommendation Summary & Rating Histogram`
      - `Rating Summary` is to display `rating average and count`.
      - `Recommendation Summary` is to display `recommendations percentage & count`.
      - `Rating Histogram` is to display `rating distributions percentage`
        - on-click of any `rating-distribution` filters the reviews based on associated rating-value only.
      - For viewport `> 768` devices, sections renders horizontally in one row.
      - For viewport `<=768` devices, sections renders in two rows, where `Rating Summary & Recommendation Summary` in first-row and `Rating Histogram` in second-row.
    - `Write Review Navigation` button will take you to `Write Review` page.
    - `Filters` has two sections horizontally, which are `Sort by & Filter by stars`.
      - `Sort by` is to sort reviews based on `Most Recent, Positive First & Negative First`.
      - `Filters by stars` is to filter reviews based on multiple selection of `1 star, 2 stars, 3 stars, 4 stars, 5 stars`
    - `Reviews List` render review-items based on `Filters & Pagination` selected.
      - Each review-item has `Name, Rating, Recommend, Date & Comment`, where `Recommend` text render with different icons based on associated value.
    - `Pagination` has three sections horizontally, which are `Reviews/Page, Display Text & Pagination Buttons`.
      - `Reviews/Page` has four options, which are `10, 25, 50 & 100`.
      - `Display Text` describes how many items of total-reviews are getting displayed on that particular page.
      - `Pagination Buttons` are to navigate between different pages.
- It has a header
  - It has a logo-text & two navigation buttons for two-pages.
  - It is responsive header render with drawer on small screens.
- It has a footer shows a static content.

### Technology stack used

- The project was bootstrapped by using [Create React App](https://github.com/facebook/create-react-app) with `React & TypeScript`.
- `redux` with `reduxjs-toolkit` used for state-management library.
- `mui` with `styled-components` used for UI-Components.
- `mui-rff` with `react-final-form` used for form-validations.
- `moment` library used for time-stamps.
- `react-toastify` used to show notification on review added.
- `testing-library` with `jest` is used for testing the components, hooks & utils.
- `redux-logger` used to check store/state updates in development mode.

### Potential improvements

- `Write Review` page
  - Can provide different rating categories such as `Value for Money, Quality & Design`, as it provides more information for the user to go for it.
- `All Reviews` page
  - Can provide `helpful & not helpful` options on each review-item, which is useful for the stake-holder/business to understand users expectations.
  - Can add a `Layout` button to switch layout between `List/Grid`, so users can switch to his preferred layout.
  - Can provide `search` input field to search reviews based on content, so users doesn't have to go through every page to find a specific content, but it is an expensive operation when review-list is big.
