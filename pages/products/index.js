import Head from 'next/head'
import Link from 'next/link'
import ProductThumbnail from '../../components/ProductThumbnail';
const contentful = require("contentful");
import styles from '../../styles/Products.module.css'

const client = contentful.createClient({
    space: process.env.SPACE,
    accessToken: process.env.ACCESS_TOKEN
  });

export const getStaticProps = async () => {
    const data = await client.getEntries({
        content_type: "product"
    });
    return {
        props: {
            products: data.items,
            revalidate: 1
        }
    }
}

export default function Products({products}){
    return(
        <div>
            <Head>
                <meta name="description" content="A list of product sold by On My Own." />
                <title>On My Own | Products</title>
            </Head>

            <main>
                <div className={styles.productsContainer}>
                    <h1>Product</h1>
                    {products.map(product => (
                        <Link 
                            href={`/products/${product.fields.id}`}
                            key={product.fields.id}>
                            <a>
                                <ProductThumbnail 
                                    img={product.fields.images[0]} 
                                    brandName={product.fields.brandName} 
                                    productName={product.fields.productName}
                                    price={product.fields.price} 
                                    />
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}