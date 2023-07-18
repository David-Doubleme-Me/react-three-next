'use client'
import dynamic from 'next/dynamic'

const CircleLoader = dynamic(() => import('react-spinners').then((lib) => lib.CircleLoader), {
  ssr: false,
})

type Props = {
  size?: number
  color?: string
}

export default function FullLoading({ size = 10, color = '#f6f6f6' }: Props) {
  return (
    <section className='flex items-center justify-center w-full h-full'>
      <CircleLoader size={size} color={color} />
    </section>
  )
}
