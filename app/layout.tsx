import './global.css'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Double me',
  description: 'web 3d poc project',
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en' className={`antialiased ${openSans.className}`}>
      <body>
        <main className='w-full h-screen'>{children}</main>
      </body>
    </html>
  )
}
