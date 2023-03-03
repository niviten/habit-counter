import Link from 'next/link'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function NavbarComponent({ brand, navbarItems, pathname }) {
  const [ activeLink, setActiveLink ] = useState(() => {
    return navbarItems.reduce((prev, curr) => {
      if (pathname.startsWith(curr.path)) return curr.path
      return prev
    }, '/')
  })

  return <>
    <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
      <Container>
        <Link href={brand.path} className='navbar-brand'>{brand.name}</Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {
              navbarItems.map((item, index) => {
                const linkClassName = (activeLink === item.path) ? 'nav-link active' : 'nav-link'
                return <Link
                  key={index}
                  href={item.path}
                  className={linkClassName}
                  onClick={() => setActiveLink(item.path)}
                >
                  {item.name}
                </Link>
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
}
