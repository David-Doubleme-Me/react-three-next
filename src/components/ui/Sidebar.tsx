import Link from 'next/link'
import IconTextButton from './buttons/IconTextButton'
import { RiHome5Fill, RiScreenshot2Fill } from 'react-icons/ri'
import { AiTwotoneVideoCamera } from 'react-icons/ai'
import { BsBox } from 'react-icons/bs'
import { GiBearFace, GiBrickWall } from 'react-icons/gi'
import { TbResize } from 'react-icons/tb'
import { SiLevelsdotfyi } from 'react-icons/si'
import { BiMoviePlay, BiLoaderCircle } from 'react-icons/bi'
import { RxShadowInner } from 'react-icons/rx'
import { HiOutlineAnnotation } from 'react-icons/hi'

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
  {
    name: 'Resize',
    pathname: '/resize',
    icon: TbResize,
  },
  {
    name: 'LOD',
    pathname: '/lod',
    icon: SiLevelsdotfyi,
  },
  {
    name: 'Animation',
    pathname: '/animation',
    icon: BiMoviePlay,
  },
  {
    name: 'Loading',
    pathname: '/loading',
    icon: BiLoaderCircle,
  },
  {
    name: 'Screenshot',
    pathname: '/screenshot',
    icon: RiScreenshot2Fill,
  },
  {
    name: 'AntiAliasing',
    pathname: '/antialiasing',
    icon: RxShadowInner,
  },
  {
    name: 'Annotation',
    pathname: '/annotation',
    icon: HiOutlineAnnotation,
  },
  {
    name: 'Annotation occlude',
    pathname: '/occlude',
    icon: GiBrickWall,
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
