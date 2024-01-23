'use client'
import Image from "next/image";
import SearchForm, { InputSearchSchemaType } from './search_form';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfiniteScrollComponent from "./infinite_scroll";
import { searchMovies } from "./actions/searchMovies";
import { useAppState } from "./store/zustand";

export default function Home() {
  // async function submit(data: { search_string: string }) {
  //   'use server'
  //   const url = `https://api.themoviedb.org/3/search/movie?api_key=3a60787c4ac32131bc493505f2dc83bb&query=${data.search_string}&include_adult=false&language=en-US&page=1`;
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTYwNzg3YzRhYzMyMTMxYmM0OTM1MDVmMmRjODNiYiIsInN1YiI6IjY1YWYwMTEzM2UyZWM4MDBlYmYwMWVmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Ca3Zf0aSy_QbFMtRsMe7qBpjayVqBgkQkmOigvWiY4'
  //     }
  //   };

  //   const res = await fetch(url, options);
  //   results = await res.json();
  //   // console.log(data);
  // }

  // async function refetch(){
  //   'use server'
  //   const data = await fetch('');
  //   return await data.json();
  // }

  const { search_input } = useAppState();

  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <SearchForm  />
        <InfiniteScrollComponent  />
      </div>

    </main>

  );
}