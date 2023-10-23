import { useEffect, useState } from "react"

export default function Article({
    article
}) {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const API_URL = `http://hn.algolia.com/api/v1/users/:${article.author}`;
        
        async function fetchAuthor(){
            const response = await fetch(API_URL);
            const data = await response;
            setAuthor(data)
            
        }

        fetchAuthor();

    }, [article])
    return (
        <div>
        <p className="article">
            <a href={article.url}>{article.title}</a>
            <br />
            {article.text}
        </p>
        {/* {
            author && 
        (
        <p className="text">
            By {author.username}
            <span>{author.about}</span>
        </p>
        )
        } */}
        </div>
    )
}