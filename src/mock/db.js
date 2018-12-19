import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
const db = low(
  new LocalStorage(
    (process.env.VUE_APP_MAIN_MOCK_DB_DOMAIN || 'mock-default-db') +
      '-' +
      (process.env.VUE_APP_MAIN_MOCK_DB_VERSION || '')
  )
)

db.defaults({
  survey: []
}).write()

export default db
