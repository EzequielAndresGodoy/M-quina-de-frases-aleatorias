function App() {

  const [quotes, setQuotes] = React.useState([]);
  const [randomQuotes, setRandomQuotes] = React.useState([]);
  const [color, setColors] = React.useState("#fff");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuotes(data);
      let randIndex = Math.floor(Math.random() * data.length)
      setRandomQuotes(data[randIndex])
    }
    fetchData();
    
  }, [])

  const getNewQuote = () => {
    let randColor = Math.floor(Math.random()*16777215).toString(16);
    setColors(randColor)
    console.log(randColor)
    let randIndex = Math.floor(Math.random() * quotes.length)
    setRandomQuotes(quotes[randIndex])
  }

  return (
    <div  style={{backgroundColor: "#"+color, minHeight: '100vh'}}>
      <div className="container">
        <div className="jumbotron abs-center">
          <div className="card" style={{backgroundColor: "#ffffffab"}}>
            <div className="card-header">
              Frases Inspiradoras
            </div>
            <div className="card-body">
              {randomQuotes ? (
                <>
                <h5 className="card-title"> - {randomQuotes.author || "No author"}</h5>
                <p className="card-text">&quot;{randomQuotes.text}&quot;</p>
                </>
              ) : (
                <h2>Loading</h2>
              )}

              <div className="row d-flex justify-content-between">
                <div className="col-6">
                  <button onClick={getNewQuote} className="btn btn-primary ml-3">Nueva Cita</button>
                  
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <a href={
                    "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(
                      '"' + randomQuotes.text + '" ' + randomQuotes.author
                    )
                  } target="_black" className="btn btn-warning">
                  <i className="ri-twitter-fill"></i>
                  </a>
                  <a href={
                    "https://www.tumblr.com/widgets/share/tool?posttype=quote%tags=quotes,freecodecamp&caption=" +
                    encodeURIComponent(randomQuotes.author) + "&content=" + 
                    encodeURIComponent(randomQuotes.text) + 
                    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                  } className="btn btn-danger">
                  <i className="ri-tumblr-fill"></i>
                  </a>
                </div>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

ReactDOM.render(<App/>, document.getElementById('app'))