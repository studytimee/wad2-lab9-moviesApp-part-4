import SiteHeader from './components/siteHeader'
import MovieReviewPage from "./pages/movieReviewPage";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import UpComingMoviesPage from "./pages/movieUpComing"; // NEW
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import WatchListPage from "./pages/watchListPage"; // NEW

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Switch>
            <Route exact path="/movies/watchList" component={WatchListPage} />
            <Route exact path="/reviews/form" component={AddMovieReviewPage} />
            <Route exact path="/movies/upcoming" component={UpComingMoviesPage} />
            <Route path="/reviews/:id" component={MovieReviewPage} />
            <Route exact path="/movies/favourites" component={FavouriteMoviesPage} />
            <Route path="/movies/:id" component={MoviePage} />
            <Route exact path="/" component={HomePage} />
            <Redirect from="*" to="/" />
          </Switch>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));