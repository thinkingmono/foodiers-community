import Link from "next/link"
import Image from "next/image"
import logoImg from "@/assets/logo.png"
import classes from './main-header.module.css'
import MainHeaderBackground from '@/components/main-header/main-header-background';
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImg} alt="A plate with food on it" />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <NavLink href="/meals">Browse Meals</NavLink>
            <NavLink href="/community" >Foodies Community</NavLink>
            {/* <li><Link href="/meals" className={path.startsWith('/meals') ? classes.active : undefined}>Browse Meals</Link></li>
            <li><Link href="/community" className={path === '/community' ? classes.active : undefined}>Foodies Community</Link></li> */}
          </ul>
        </nav>
      </header>
    </>
  )
}