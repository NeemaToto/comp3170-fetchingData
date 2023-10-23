import './App.css';
import { useState, useEffect, useRef } from 'react';
import Article from './components/Article';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  //  const [search, setSearch] = useState('')
  const inputRef = useRef()
  const [loading, setLoading] = useState(false);

  // function handleSearch(){
  //   setQuery(search)
  // }

  function handleSearch() {
    // The input ref points to the <input /. DOM element
    setQuery(inputRef.current.value)
  }

  useEffect(() => {
    setLoading(true)

    const API_URL = `http://hn.algolia.com/api/v1/search?query=${query}`;

    async function fetchArticles() {
      const resp = await fetch(API_URL);
      const data = await resp.json();
      console.log(data.hits)
      setArticles(data.hits)
      setLoading(false)
    }

    setTimeout(() => {
      fetchArticles();
    }, 2000)

  }, [query])

  return (
    <div className="App">

      {loading ? <div>Loading...</div> : (<>
        {/* <input type='text' value={search} onChange={(e) => setSearch(e.target.value)}></input> */}
        <input type='text' ref={inputRef} placeholder='Search...'></input>
        <button onClick={() => handleSearch()} >Search</button>
        {
          articles && articles.map((article, index) => {
            return (
              <Article key={index} article={article} />
            )
          })
        }
      </>)}
    </div>
  )
}

