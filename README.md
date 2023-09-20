# ΔDelta Bot

![Delta banner](assets/banner.png)

This repository contains the source code for the official Delta bot for Discord. It contains utilitarian functions which
aid in managing the Discord, such as transcriptions for archiving channels, etc.

## Commands

### Transcribe

Name: `/transcribe <channel>` <br>
Description: `Creates a transcript for a specific channel`

## Development setup

### Pre requisites

- [Node](https://nodejs.org/en) 20+
- [PNPM](https://pnpm.io)
- [Git](https://git-scm.com)

### Installation

Clone the source files from GitHub using the clone command:

```sh
git clone https://github.com/Typiqally/delta-bot.git # for HTTPS
git clone git@github.com:Typiqally/delta-bot.git # for SSH
```

Navigate to the cloned directory and install the required dependencies:

```sh
pnpm install
```

### Configuring

> Please do not modify the `.env.example` file as it is tracked by the source tree

Copy the `.env.example` file and rename it to `.env`, the file should look something like:

```sh
APPLICATION_ID=
TOKEN=
```

The application id and token can be found at https://discord.com/developers/applications. Obviously the official Delta
bot application id and token are not published here. In case access is required, please create an issue or send a direct
message on Discord to the relevant administrator(s).

### Running

Running Delta bot is as simple as running the following command:

```sh
pnpm run dev
```

The bot will return a login confirmation message and start listening for interactions. Indicated by the `dev` command,
changes made to the source code will automatically refresh the process, so there is no need to continuously restart the
process when developing.

## License

Delta bot is licensed under the terms of GPL v3. See [LICENSE](LICENSE) for details.

