import Image from 'next/image'

export default function MainLogo() {
  return (
    <section className='object-cover'>
      <Image src={`/image/logo/TwinWorld.png`} alt='main log' width={112} height={24} />
    </section>
  )
}
