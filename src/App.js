import React, { useState, useEffect } from 'react';

const App = () => {

  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false)

  const fetchNews = () => {
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      // .then(data => console.log(data))
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchNews()
  }, [url])

  const handleChange = event => {
    setSearchQuery(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }

  const showLoading = () => {
    return (loading ? <h2>Loading...</h2> : "")
  }

  const searchForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
    )
  }

  const showNews = () => {
    return (
      news.map((n, i) => {
        return (
          <p key={i}>{n.title}</p>
        )
      })
    )
  }

  return (
    <div>
      <h1>News App</h1>
      {showLoading()}
      {searchForm()}
      {showNews()}
    </div>
  )
}

export default App;
