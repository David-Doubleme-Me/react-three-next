import Image from 'next/image'
import { FaUserAlt } from 'react-icons/fa'
type Props = {
  image?: string
}

export default function Avatar({ image }: Props) {
  return (
    <section className='object-cover w-6 h-6 rounded-full'>
      {image ? <Image src={image} height={24} width={24} alt='user image' /> : <FaUserAlt className='w-6 h-6' />}
    </section>
  )
}
