import React from 'react'

function Background() {
  return (
    <div className='fixed z-[2] w-full h-screen'>
      <div className='absolute pt-12 w-full flex justify-center text-zinc-700 font-semibold text-xl'>Documents</div>
      <h1 className='absolute text-[13vw] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[60%] leading-none tracking-tight font-bold text-zinc-600'>Docs.</h1>
    </div>
  )
}

export default Background
