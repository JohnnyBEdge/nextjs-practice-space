import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const contentful = require("contentful");

const client = contentful.createClient({
    space: process.env.SPACE,
    accessToken: process.env.ACCESS_TOKEN
})

// export const getStaticPaths = async () => {
//     const data = await client.getEntries({
//         content_type: 'product'
//     });

//     return {
//         paths: data.items.map(item => ({
//             params: {
//                 id: item.fields.id
//             }
//         })),
//         fallback: true
//     }
// }
export const getStaticPaths = async () => {
    const data = await client.getEntries({
        content_type: 'product'
    });
    return {
        paths: data.items.map(item => ({
            params: {
                id: item.fields.id.toString()
            }
        })),
        //since using revalide below, fallback should be true bc the paths that
        //have not been genewrated at build time will not result in a 404 error
        fallback: true
    }
};

export const getStaticProps = async ({params}) => {
    console.log("PARAMMSSSSS", params)
    const data = await client.getEntries({
        content_type: 'product',
        'fields.id': params.id
    });
    return {
        props: {
            product: data.items[0],
            //keep revalidate to show if product has sold so quantity will be up to date
            revalidate: 1
        }
    }
}

export default function Product({product}) {
  if(!product) return <div>404</div>;
    console.log("PRODUCTTTTTTT", product)
  return (
    <div >
      <Head>
        <title>On My Own | {product.fields.productName}</title>
      </Head>

      <main>
        <h1>{`${product.fields.brandName}-${product.fields.productName}`}</h1>
        <div>

        </div>

      </main>
    </div>
  )
}
