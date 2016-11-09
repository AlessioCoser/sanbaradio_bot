# Simple Bot
This is a simple bot made with claudiajs and claudia-bot-builder on AWS Lambda

### Requirements

- nodejs & npm
- AWS account

### Install

```
npm install
```

### Create the lambda

```
npm run create [-- --profile your-aws-profile]
```

## Update the Lambda

```
npm run update [-- --profile your-aws-profile]
```

## Destroy the Lambda

```
npm run destroy [-- --profile your-aws-profile]
```


## Configure bot on telegram
Information take from: [claudiajs tutorial](https://claudiajs.com/tutorials/hello-world-chatbot.html#telegram-bot-configuration)

- For getting a Telegram bot access token - use _BotFather_ bot for creating bots.
- Use `npm run update -- --configure-telegram-bot [--profile your-aws-profile]` to configure the access token in your bot.

