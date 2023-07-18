import Link from 'next/link'
import IconTextButton from './buttons/IconTextButton'
import { RiHome5Fill } from 'react-icons/ri'
import { AiTwotoneVideoCamera } from 'react-icons/ai'
import { BsBox } from 'react-icons/bs'
import { GiBearFace } from 'react-icons/gi'

const LINK = [
  {
    name: 'Home',
    pathname: '/',
    icon: RiHome5Fill,
  },
  {
    name: 'Box',
    pathname: '/box',
    icon: BsBox,
  },
  {
    name: 'Camera',
    pathname: '/box',
    icon: AiTwotoneVideoCamera,
  },
  {
    name: 'GLTF',
    pathname: '/gltf',
    icon: GiBearFace,
  },
]

export default function Sidebar() {
  return (
    <aside className='w-full h-full p-2 text-white bg-black'>
      <ul className='flex flex-col'>
        {LINK.map(({ name, pathname, icon }) => (
          <li key={name}>
            <Link href={pathname}>
              <IconTextButton Icon={icon} name={name} />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
