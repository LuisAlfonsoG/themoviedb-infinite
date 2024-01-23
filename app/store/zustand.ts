import { MoviesData } from '@/lib/movies';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DataState = {
  search_input: string,
  search_result: MoviesData[],
  updateInput: (value: string) => void,
  updateSearch: (values: MoviesData[]) => void
}

export const useAppState = create<DataState>()(
  persist(
    set => (
      {
        search_input: '',
        search_result: [],
        updateInput: (value) => set(() => ({ search_input: value })),
        updateSearch: (values) => {
          set((state) => ({ search_result: state.search_result.concat(values) }))
        }
      }
    ), 
    {name: 'data-state'}
  )
);