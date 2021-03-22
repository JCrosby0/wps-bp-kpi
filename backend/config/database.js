module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URI'),
      },
      settings: {
        host: env('DATABASE_HOST', 'cluster0.vhddy.mongodb.net'),
        srv: env.bool('DATABASE_SRV', 'true'),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'DBWpsBpKpi'),
        username: env('DATABASE_USERNAME', 'crosbySolutionsDB'),
        password: env('DATABASE_PASSWORD', 'mi7VyMXQeLkOH12X'),
      },

      options: {
        ssl: true,
      },
    },
  },
});
