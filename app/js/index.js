function route(event) {
  event = event || window.event
  event.preventDefault()

  window.history.pushState({}, '', event.target.href)
  handle()
}

function handle() {
  const { pathname } = window.location
  const route = routes[pathname] || routes[404]

  fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
}

const routes = {
  '/': '/app/pages/home.html',
  '/universe': '/app/pages/universe.html',
  '/explorer': '/app/pages/explorer.html',
  404: '/app/pages/404.html'
}
