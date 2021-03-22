  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URI'),
      },
      settings: {
        host: env('DATABASE_HOST', null),
        srv: env.bool('DATABASE_SRV', 'true'),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', null),
        username: env('DATABASE_USERNAME', null),
        password: env('DATABASE_PASSWORD', null),
      },

      options: {
        ssl: true,
      },
    },
  },
});
