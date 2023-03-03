import NavbarComponent from '@/components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'
import Container from 'react-bootstrap/Container'

export default function App({ Component, pageProps }) {
  const navbarItems = [
    { name: 'Home', path: '/' },
    { name: 'Habits', path: '/habits' }
  ]

  const brand = { name: 'Habit Counter', path: '/' }

  const router = useRouter()

  return <>
    <NavbarComponent brand={brand} navbarItems={navbarItems} pathname={router.pathname} />
    <Container>
      <Component {...pageProps} />
    </Container>
  </>
}
