import Link from 'next/link'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const NotFound = () => {

    //initialize the hook and store in a variable
    //returns a router object that contains a method we can use to redirect a user
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            //will take the user back one page, as if hitting the back btn
            //router.go(-1)
            
            //redirects to the passed in route
            router.push("/");
        }, 3000)
        //empty array is a dependency array and tell function only to fire once 
        // (when empty) when loaded, and not again when state changes
    }, [])
    return (
        <div className="not-found">
            <h1>Oooops....</h1>
            <h2>Page not found</h2>
            <p>Go back to the <Link href="/"><a>Homepage...</a></Link></p>
            <p>or wait 3 seconds</p>

        </div>
    )
}
export default NotFound;