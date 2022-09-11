const { Client, GatewayIntentBits } = require('discord.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { watchFile } = require('fs');

const config = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log('\nONLINE\n');
  const channel = client.channels.cache.find(channel => channel.name === config.CHANNEL);
  // watch for file changes
  watchFile('shot.png', async (curr, prev) => {
    console.log('uploading new screenshot...    ');
    // create attachment
    const screenshot = new AttachmentBuilder('shot.png');
    const embedShot = new EmbedBuilder().setImage('attachment://shot.png').setTimestamp();
    // send attachemnt as embed
    await channel.send({ embeds: [embedShot], files: [screenshot] });
    console.log('uploaded\n');
  });
});

client.login(config.BOT_TOKEN);
