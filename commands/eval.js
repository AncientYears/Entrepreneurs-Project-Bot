const discord = require('discord.js');
const cblockre = /(^```js)|(```$)/g;
module.exports.run = async (client, message, args, ecoPool) => {
    if (!['193406800614129664', '211795109132369920'].includes(message.author.id)) return message.reply('This command cannot be used by you!');
    module.exports.run = async (bot, message, args) => {
        try {
            let content = args.join(' ');
            if (cblockre.test(content)) {
                content = content.replace(cblockre, '').trim();
            }
            let evaled = eval(content);
            if (typeof evaled !== 'string') {
                evaled = require('util').inspect(evaled);
            }
            message.channel.send(evaled)
        }
        catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        }
    }
};
module.exports.help = {
    name: 'eval'
    , description: 'Evals'
    , usage: 'eval <<>>'
    , aliases: ['e']
, };
