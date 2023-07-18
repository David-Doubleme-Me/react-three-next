import Sidebar from '@/components/ui/Sidebar'
import './global.css'
import { Open_Sans } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'

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
        <header className='sticky top-0 px-4 py-2 bg-black'>
          <Navbar />
        </header>
        <div className='flex w-full'>
          <div className='basis-1/6'>
            <Sidebar />
          </div>
          <div className='basis-5/6'>
            <main className='w-full h-screen bg-black'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
