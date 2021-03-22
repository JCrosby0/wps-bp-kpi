// intercept 401 errors (not authenticated) and redirect to login page
export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) redirect('/login')
  })
}
