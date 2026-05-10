import env from '#start/env'
import { defineConfig } from '@benhepburn/adonis-mongoose'

const mongooseConfig = defineConfig({
  mongodb: {
    useDefaultConnection: true,
    uri: env.get('MONGODB_URI'),
    options: {},
  },
})

export default mongooseConfig
