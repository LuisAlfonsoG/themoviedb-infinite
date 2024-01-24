'use client'

import { QueryClientProvider, QueryClient, useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Page, useAppState } from "./store/zustand";
import { searchMovies } from "./actions/searchMovies";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient()


export default function InfiniteScrollComponent({ render }: { render: (data: InfiniteData<Page>) => JSX.Element }) {
  return (
    <QueryClientProvider client={queryClient} >
      <ScrollComponent render={render} />
    </QueryClientProvider>
  )
}

function ScrollComponent({ render }: { render: (data: InfiniteData<Page>) => JSX.Element }) {

  const { ref, inView } = useInView();

  const { search_input } = useAppState();

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [search_input],
    queryFn: fetchFunction,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    initialPageParam: 2,
  })

  async function fetchFunction({pageParam = 1}) {
    const results = await searchMovies(search_input, pageParam );
    return results;
  }

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div>
      {status == 'error'
        ? <p>{error.message}</p>
        : (
          <div className="min-h-screen">
            {render(data as InfiniteData<Page>)}
            <div>
              <Button
                className="m-2"
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Cargando más resultados...'
                  : hasNextPage
                    ? 'Cargar más'
                    : 'Fin de los resultados'}
              </Button>
            </div>
          </div>
        )
      }
    </div>
  );

}

