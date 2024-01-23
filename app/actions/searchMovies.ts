'use server'

import { InputSearchSchemaType } from "../search_form";

export async function searchMovies({ data, pageParam = 1 }: { data: InputSearchSchemaType, pageParam: number }) {
  console.log('started fetching');
  const api_key = process.env.API_KEY;
  console.log(api_key)
  const buildUrl = new URL(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}`);
  buildUrl.searchParams.append('query', encodeURIComponent(data.search_string));

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  buildUrl.searchParams.append('page', pageParam.toString());

  const res = await fetch(buildUrl, options);
  const result = await res.json();
  
  console.log(result);
  return result;
}