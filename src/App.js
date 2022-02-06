import Navigation from "./components/Navigation";
import MovieDetails from "./components/MovieDetails";
import MoviePicker from "./components/MoviePicker";
import MovieWatched from "./components/MovieWatched";
import MovieUnwatched from "./components/MovieUnwatched";


function App() {
  return (
    <div className="App">
      <Navigation />
      <MoviePicker />
      <MovieUnwatched />
      <MovieWatched />
    </div>
  );
}

export default App;
