import { Card, CardContent, CardHeader } from "./card"
import Image from "next/image"

export type MovieData = {
  id: number,
  title: string,
  overview: string,
  poster_path: string
}

type Props = { movie: MovieData }

export default function MovieCard({ movie }: Props) {
  const image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  return (
    <Card >
      <CardHeader>
        <h1 className="text-lg font-medium text-slate-900">
          {movie.title}
        </h1>
      </CardHeader>
      <CardContent className="flex align-center space-x-2 flex-wrap sm:flex-nowrap">
        <div className="w-32 shrink-0 h-50">
          {movie.poster_path
            ? <Image width={200} height={300} src={image_url} alt={movie.title} />
            : ''
          }
        </div>
        <div>
          <p>{movie.overview}</p>
        </div>
      </CardContent>
    </Card>
  )
}