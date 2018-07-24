import { createSelector } from 'redux-bundler'

export default {
  name: 'redirects',

  reactToEmptyHash: createSelector(
    'selectHash',
    (hash) => {
      if (hash === '' || hash === '#' || hash === '#/') {
        return { actionCreator: 'doUpdateHash', args: ['#/explore'] }
      }
    }
  )
}
