/** @jsx h */

import { h, hydrate } from './nano.ts'

import Comments from './components/CommentsList.tsx'

const comments = ['client side comment one', 'client side comment two']

const start = () => {
  hydrate(<Comments comments={comments} />, document.getElementById('comments'))
}

window.addEventListener('load', event => {
  start()
})
