import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Articles.module.css'

const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN
});

export const getStaticProps = async () => {
  let data = await client.getEntries({
    content_type: 'article' 
  });
  return {
    props: {
      articles: data.items,
      //runs getStaticProps again and reloads data if any changes. NOrmally getstaticprops only runs once
      //at build time. you can set the number to whatever seconds you want to rerun at
      revalidate: 1
    }
  }
}

export default function Articles({articles}) {
  return (
    <div >
      <Head>
        <title>On My Own | Articles</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Articles
        </h1>
        <ul>
          {articles.map(article => (
              <Link 
                href={`/articles/${article.fields.slug}`}
                key={article.fields.id}>
                <li className={styles.article}>{article.fields.title}</li>
              </Link>
        ))}
        </ul>
      </main>
    </div>
  )
}
