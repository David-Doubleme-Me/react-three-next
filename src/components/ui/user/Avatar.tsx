import Image from 'next/image'
import { FaUserAlt } from 'react-icons/fa'
type Props = {
  image?: string
}

export default function Avatar({ image }: Props) {
  return (
    <section className='flex items-center justify-center object-cover border rounded-full box-sizing w-9 h-9 border-neutral-100'>
      {image ? (
        <Image src={image} height={36} width={36} alt='user image' />
      ) : (
        <FaUserAlt className='w-6 h-6 text-white' />
      )}
    </section>
  )
}
