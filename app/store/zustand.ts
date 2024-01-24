import { MovieData } from '@/components/ui/movieCard';
import { InfiniteData } from '@tanstack/react-query';
import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

export type Page = {
  page: number,
  total_pages: number,
  total_results: number,
  results: MovieData[]
}

export type PagesType = {
  pageParams: number[],
  pages: Page[]
}

export type DataState = {
  search_input: string,
  updateInput: (value: string) => void,
  search_results_by_pages: InfiniteData<Page>,
  updatePages: (new_page: Page) => void 
}

const initial_pages: PagesType = {pageParams: [], pages: []};

export const useAppState = create<DataState>()(
  persist(
    set => (
      {
        search_input: '',
        search_results_by_pages: Object.create(initial_pages),

        updateInput: (value) => set(() => ({search_input: value, search_results_by_pages: Object.create(initial_pages) })),
        updatePages: (new_page) => set((state) => {          
          return ({search_results_by_pages: {
            pageParams: state.search_results_by_pages.pageParams.concat(state.search_results_by_pages.pageParams.length),
            pages: state.search_results_by_pages.pages.concat([new_page])
          }})
        } )
      }
    ),
    {
      name: 'state-storage'
    } 
  )
);