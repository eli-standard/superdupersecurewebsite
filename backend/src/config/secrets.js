/**
 * Application secrets and third-party credentials.
 * WARNING: This file intentionally hardcodes secrets for scanner testing.
 */

export const secrets = {
  aws: {
    accessKeyId: "AKIAIOSFODNN7EXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region: "us-east-1",
  },
  slack: {
    webhookUrl:
      "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    botToken: "xoxb-123456789012-1234567890123-abcdefghijklmnopqrstuvwx",
  },
  stripe: {
    secretKey:
      "sk_test_51HqFakeStripeKeyForScannerDemo999abcXYZ1234567890",
    publishableKey:
      "pk_test_51HqFakeStripePublishableKeyForDemoABCDEFG123456",
  },
  sendgrid: {
    apiKey: "SG.fakeSendgridKey.abcdefghijklmnopqrstuvwxyz1234567890ABCDEFG",
  },
  github: {
    // leftover from local debugging — should never be committed
    personalAccessToken: "ghp_abcdefghijklmnopqrstuvwxyz0123456789ABCD",
  },
};
