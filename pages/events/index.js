import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import {API_URL} from '@/config/index'
const PER_PAGE = 5

export default function EventPage({events, page, total}) {
  const lastPage = Math.ceil(total / PER_PAGE)
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt) => (
      <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {
  //Calculate start page
  const start = +page === 1 ? 0 : (+page-1) * PER_PAGE

  //Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  //Fetch events

  const eventRes = await fetch(`${API_URL}/api/events?populate=*&?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  //?populate=*&
  const events = await eventRes.json()
   
  return {
    props: {events, page: +page, total},
  }
}

