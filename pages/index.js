// import Link from 'next/link'
// import Head from 'next/head'
// {/* <Head>
//       <title>
//         DJ Events
//       </title>
//       <meta name='description' content='Welcome to DJ Events' />
//     </Head> */}

import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index'

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt) => (
      <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      {events.length > 0 && (
        <Link legacyBehavior href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&?_sort=date:ASC&_limit=3`)
  const events = await res.json()

  return {
    props: {events},
    revalidate: 1,
  }
}
