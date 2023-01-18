import Link from 'next/link'
import Head from 'next/head'
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'

export default function HomePage({events}) {
  console.log(events)
  return (
    <Layout>
    {/* <Head>
      <title>
        DJ Events
      </title>
      <meta name='description' content='Welcome to DJ Events' />
    </Head> */}
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(evt => <h3>{evt.name}</h3>)}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: {events},
    revalidate: 1,
  }
}
