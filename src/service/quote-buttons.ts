import {ActionRowBuilder, ButtonBuilder} from "discord.js";

const previous = new ButtonBuilder()
    .setCustomId('previous-page')
    .setLabel("◄")
    .setStyle(2);

const next = new ButtonBuilder()
    .setCustomId('next-page')
    .setLabel('►')
    .setStyle(1);

const row = new ActionRowBuilder()
    .addComponents(previous, next);

export {previous, next, row}
