import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                {/* <Image 
                    src="/logo.jpg" 
                    width={75}
                    height={75} /> */}
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/articles"><a>Articles</a></Link>
            <Link href="/products"><a>Products</a></Link>
        </nav>
    )
}
export default Navbar;