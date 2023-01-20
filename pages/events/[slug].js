import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { func } from "prop-types"

export default function EventPage({evt}) {

  evt = evt.attributes
  console.log(evt.image.data.attributes.formats.thumbnail.url)

  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE'
      })

      const data = await res.json()

      if(!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }
    }
  }

  return (
    <Layout>
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link legacyBehavior href={`/events/edit/${evt.id}`}>
              <a><FaPencilAlt /> Edit Event</a>
            </Link>
            <a href='#' className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>
          <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
          </span>
          <h1>{evt.name}</h1>
          <ToastContainer />
          {evt.image && (
            <div className={styles.image}>
              <Image src={evt.image.data.attributes.formats.thumbnail.url} width={960} height={600} />
            </div>
          )}

          <h3>Performers:</h3>
          <p>{evt.performers}</p>
          <h3>Description</h3>
          <p>{evt.description}</p>
          <h3>Venue: {evt.venue}</h3>
          <p>{evt.address}</p>

          <Link legacyBehavior href='/events'>
            <a className={styles.back}>{'<'} Go Back</a>
          </Link>
        </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`)
  const events = await res.json()
  
  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?populate=*&?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events.data[0],
    },
    revalidate: 1,
  }
}


// export async function getServerSideProps({ query: 
//   { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }