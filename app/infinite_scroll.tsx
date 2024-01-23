'use client'

import { QueryClientProvider, QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppState } from "./store/zustand";
import { MoviesData } from "@/lib/movies";
import { Card, CardHeader } from "@/components/ui/card";
import { searchMovies } from "./actions/searchMovies";
const queryClient = new QueryClient()

function MoviewView({ movie }: { movie: MoviesData }) {
  return (
    <Card key={movie.id}>
      <CardHeader>
        {movie.title}
      </CardHeader>
    </Card>
  )
}

export default function InfiniteScrollComponent({search_input}: {search_input: string}) {
  return (
    <QueryClientProvider client={queryClient} >
      {
        search_input
          ? <ScrollComponent search_input={search_input} />
          : ''
      }
    </QueryClientProvider>
  )
}

function ScrollComponent({ search_input }: { search_input: string }) {

  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    {
      queryKey: ['movies'],
      queryFn: fetchFunction,
      getNextPageParam: (lastPage, pages) => lastPage.page + 1,
      initialPageParam: 1
    }
  )

  async function fetchFunction({ pageParam = 1 }) {
    console.log(pageParam)
    return await searchMovies({ data: { search_string: search_input }, pageParam: pageParam });
  }

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  console.log(data);
  return (
    <div>{
      status == 'pending'
        ? <p>cargando...</p>
        : status == 'error'
          ? <p>Error</p>
          : (
            <div>
              {
                data.pages.map((page) => (
                  <div key={page?.page}>
                    {
                      page?.results?.map((movies: MoviesData) =>
                        <MoviewView movie={movies} ></MoviewView>
                      )
                    }
                  </div>
                ))
              }
              <div>
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Cargando más resultados...'
                    : hasNextPage
                      ? 'Cargar más'
                      : 'Fin de los resultados'}
                </button>
              </div>
            </div>
          )
    }
      <p></p>
    </div>
  );

}

