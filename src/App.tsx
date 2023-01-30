import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from 'containers'
import { Home, Reviews, NotFound } from 'pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
