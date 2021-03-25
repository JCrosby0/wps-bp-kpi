module.exports = ({ env }) => ({
 email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'josephbcrosby@gmail.com',
      defaultReplyTo: 'josephbcrosby@gmail.com',
      testAddress: 'josephbcrosby+testemail@gmail.com',
    },
  },
  graphql: {
    playgroundAlways: true
  }
});
