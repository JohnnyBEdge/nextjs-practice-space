import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {BLOCKS} from '@contentful/rich-text-types'



const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN
});

export const getStaticPaths = async () => {
    const data = await client.getEntries({
        content_type: 'article'
    });
    return {
        paths: data.items.map(item => ({
            params: {
                slug: item.fields.slug
            }
        })),
        //since using revalide below, fallback should be true bc the paths that
        //have not been genewrated at build time will not result in a 404 error
        fallback: true
    }
};
export const getStaticProps = async ({params}) => {
    let data = await client.getEntries({
        content_type: 'article',
        'fields.slug': params.slug
    });
    return {
        props: {
            article: data.items[0],
            revalidate: 1
        }
    }
}


export default function Article({article}) {
  if(!article) return <div>404</div>;

  return (
    <div >
      <Head>
        <title>On My Own | Article-{article.slug}</title>
      </Head>

      <main>
        <h1>{article.fields.title}</h1>
        <div>
          {documentToReactComponents(article.fields.content, {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]:  node =>
              <Image 
                src={'https:' + node.data.target.fields.file.url}
                width={node.data.target.fields.file.details.image.width}
                height={node.data.target.fields.file.details.image.height} /> 
            }
          })}
        </div>

      </main>
    </div>
  )
}
