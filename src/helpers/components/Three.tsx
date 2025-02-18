'use client'

import { r3f } from '@/helpers/global'

type Props = {
  children: React.ReactNode
}

export const Three = ({ children }: Props) => {
  return <r3f.In>{children}</r3f.In>
}
