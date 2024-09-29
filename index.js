import axios from 'axios'

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
        domain,
        timestamp: Date.now(),
        response: res.data
      })
    })
    .catch(e => {
      console.error(e.message)
    })
}

tick()
setInterval(tick, interval)
