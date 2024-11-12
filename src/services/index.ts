import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASEURL

export const http = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': baseURL,
    'ngrok-skip-browser-warning': true,
  },
})