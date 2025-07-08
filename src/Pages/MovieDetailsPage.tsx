import React from 'react'
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div>MovieDetailsPage</div>
      <h1>Movie Id : {id}</h1>
    </>
  )
}

export default MovieDetailsPage