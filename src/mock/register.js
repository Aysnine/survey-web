import MockSuit from '@/lib/main/mock-suit'
import db from './db.js'
import shortid from 'shortid'
shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$'
)

import app from '@/mock/app'

MockSuit.extend('uid', shortid.generate)
MockSuit.extend('db', db)

MockSuit.load(app)
