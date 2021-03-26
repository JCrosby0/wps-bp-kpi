module.exports = ({ env }) => ({
 email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: env('SENDGRID_FROM_EMAIL', 'josephbcrosby@gmail.com'),
      defaultReplyTo: env('SENDGRID_REPLYTO_EMAIL'),
      testAddress: env('SENDGRID_TEST_ADDRESS'),
    },
  },
  graphql: {
    playgroundAlways: true
  }
});
