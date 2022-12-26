import React, { useState }from 'react';
import Display from './Display';
import Navigate from './Navigate';

export default function Home() {
  const [page, setPage] = useState(0)

  return (
    <>
      <Display page={page} setPage={setPage}/>
      <Navigate page={page} setPage={setPage}/>
    </>
  );
}
