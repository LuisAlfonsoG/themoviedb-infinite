'use server'

import { InputSearchSchemaType } from "../search_form";

export async function searchMovies(data: string, pageParam = 1) {
  const api_key = process.env.API_KEY;

  const buildUrl = new URL(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}`);
  
  buildUrl.searchParams.append('query', (data));
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  buildUrl.searchParams.append('page', pageParam.toString());

  const res = await fetch(buildUrl, options);
  const result = await res.json();
  
  return result;
}