export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, '', event.target.href)
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    switch (route) {
      case '/app/pages/universe.html':
        document.querySelector('body').classList.remove('body-1')
        document.querySelector('body').classList.remove('body-3')

        document.querySelector('body').classList.add('body-2')
        break

      case '/app/pages/explorer.html':
        document.querySelector('body').classList.remove('body-1')
        document.querySelector('body').classList.remove('body-2')

        document.querySelector('body').classList.add('body-3')
        break

      default:
        document.querySelector('body').classList.remove('body-2')
        document.querySelector('body').classList.remove('body-3')

        document.querySelector('body').classList.add('body-1')
        break
    }

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
  }
}
