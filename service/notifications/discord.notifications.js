const axios = require('axios');

const {
  DISCORD_KEY,
} = process.env;

const discordColors = {
  'error': '16711680',
  'warn': '16776960',
  'info': '65280',
  'log': '16777215',
};

function notify(message, type) {
  try {
    const params = {
      embeds: [
        {
          color: discordColors[type],
          description: makeBold(message),
        },
      ],
    };

    if (typeof DISCORD_KEY === 'string' && DISCORD_KEY.length > 36) {
      axios.post(DISCORD_KEY, params)
        .catch((error) => {
          console.error(`Request to Discord with message ${message} failed. ${error}.`);
        });
    }
  } catch (error) {
    console.error(error);
  }
}

function makeBold(text) {
  return text.replace(/(\*\b|\b\*)/g, '**');
}

module.exports = {
  notify,
};