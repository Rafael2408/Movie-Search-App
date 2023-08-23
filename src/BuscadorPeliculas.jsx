import { useState } from "react";
import errorMovie  from './assets/errorMovie.png'

export const BuscadorPeliculas = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "44fc904cb27fe6020ef1264f394330e4";

  const [busqueda, setBusqueda] = useState("");
  const [peliculas, setPeliculas] = useState([]);
  const [resultado, setResultado] = useState(false);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data.results.length);
      if (data.results.length > 0) {
        setPeliculas(data.results);
        setResultado(false);
      }else{
        setResultado(true);
      }
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input a Movie Name"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {resultado? (
        <div className="ad">
          <h2>Not Found!</h2>
          <img src={errorMovie} alt="Error Movie" />
          <h3>Try with another movie</h3>
        </div>
      ):(
        <div className="movie-list">
          {peliculas.map((pelicula) => (
            <div key={pelicula.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                alt={pelicula.title }
              />
              <h2>{pelicula.title}</h2>
              <a 
                href={`https://www.google.com/search?q=Movie ${pelicula.title}`}
                target="_blank"
              >
                Search Here
              </a>
              <p>{pelicula.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
