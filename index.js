import axios from 'axios'
import moment from 'moment'

const domain = process.env.DUCKDNS_DOMAIN
const token = process.env.DUCKDNS_TOKEN
const interval = +process.env.DUCKDNS_INTERVAL || 5 * 60 * 1000

const api = axios.create({
  baseURL: 'https://www.duckdns.org'
})

function tick () {
  return api
    .get('/update', {
      params: {
        domains: domain,
        token
      }
    })
    .then(res => {
      console.log({
        method: 'duckdns::tick',
        domain,
        timestamp: moment().format('D/M/Y h:mm a'),
        response: res.data
      })
    })
    .catch(e => {
      console.error(e.message)
    })
}

tick()
setInterval(tick, interval)
