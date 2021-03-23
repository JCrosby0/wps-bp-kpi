module.exports = ({ env }) => ({
 email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'joe@crosby.solutions',
      defaultReplyTo: 'josephbcrosby@gmail.com',
      testAddress: 'josephbcrosby+testemail@gmail.com',
    },
  },
});
