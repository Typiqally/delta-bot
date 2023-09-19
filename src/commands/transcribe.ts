import {CommandInteraction, SlashCommandBuilder, TextBasedChannel} from "discord.js";
import "discord-html-transcripts"
import {createTranscript} from "discord-html-transcripts";

export const data = new SlashCommandBuilder()
    .setName("transcribe")
    .addChannelOption(option => option.setName("channel").setDescription("Channel to transcribe").setRequired(true))
    .setDescription("Creates a transcript for a specific channel");

export async function execute(interaction: CommandInteraction) {
    const targetChannelReference = interaction.options.get("channel")!.channel!
    const targetChannel = interaction.client.channels.cache.get(targetChannelReference.id)

    await interaction.reply({
        content: `Generating transcript for \`${targetChannelReference.name}\`...`,
    })

    const attachment = await createTranscript(targetChannel as TextBasedChannel, {
        poweredBy: false,
    })

    return await interaction.editReply({
        content: `Transcript for \`${targetChannelReference.name}\``,
        files: [attachment]
    })
}