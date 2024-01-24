'use client'

import SearchForm from './search_form';
import InfiniteScrollComponent from "./infinite_scroll";
import { Page, useAppState } from "./store/zustand";
import { searchMovies } from "./actions/searchMovies";
import MovieCard from '@/components/ui/movieCard';
import { InfiniteData } from '@tanstack/react-query';

export default function Home() {

  const { search_results_by_pages, updateInput,  updatePages } = useAppState();

  async function serverFetch(data: { search_string: string }) {
    updateInput(data.search_string);

    let result = await searchMovies(data.search_string);
    updatePages(result);
  }


  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-2 sm:p-24 md:p-40 bg-gray-100 space-y-4">

      <div className="grid w-full max-w-sm items-center gap-1.5 bg-gray-300 p-2 rounded-sm border border-gray-500">
        <SearchForm serverAction={serverFetch} />
      </div>
      <div className="w-full ">
        <MovieList data={search_results_by_pages} />

        {search_results_by_pages.pages.length > 0 ?
          <InfiniteScrollComponent
            render={(data: InfiniteData<Page>) => (
              <>
                <MovieList data={data} />
              </>
            )}
          /> : ''}
      </div>

    </main>

  );
}

function MovieList({ data }: { data: InfiniteData<Page> }) {
  return (
    <>
      {data?.pages.map(page => (
        <div key={page?.page} className="grid items-center gap-2 m-2">
          {page?.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      ))}
    </>
  )
}