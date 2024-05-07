import React, { useState, useEffect } from 'react';

const QuoteBox = () => {
  const [quote, setQuote] = useState({ text: "Loading quote...", author: "Loading author..." });

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote({ text: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ text: "Failed to load quote.", author: "No author" });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div id="quote-box" className="p-4 rounded shadow bg-light">
        <p id="text" className="fs-4">{quote.text}</p>
        <p id="author" className="blockquote-footer">{quote.author}</p>
        <button id="new-quote" className="btn btn-primary mt-3" onClick={fetchQuote}>New Quote</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.text + " — " + quote.author)}`} className="btn btn-secondary mt-3" target="_blank" rel="noopener noreferrer">Tweet Quote</a>
      </div>
    </div>
  );
};

export default QuoteBox;
