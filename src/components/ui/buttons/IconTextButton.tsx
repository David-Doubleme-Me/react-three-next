import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  Icon: IconType
  name: string
}

export default function IconTextButton({ Icon, name }: Props) {
  return (
    <button className='flex items-center w-full p-2 rounded-lg hover:bg-zinc-800'>
      <Icon className='w-5 h-5 mr-4' />
      <span className=''>{name}</span>
    </button>
  )
}
