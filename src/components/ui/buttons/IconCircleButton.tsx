import { IconType } from 'react-icons'

type Props = {
  Icon: IconType
  onClick: () => void
}

export default function IconCircleButton({ Icon, onClick }: Props) {
  return (
    <button className='p-2 rounded-full hover:bg-zinc-800' onClick={onClick}>
      <Icon className='w-5 h-5' />
    </button>
  )
}
