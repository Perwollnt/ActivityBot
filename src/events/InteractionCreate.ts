import { CommandInteraction, Interaction } from "discord.js";
import { commands } from "../client";
import { Logger } from "../helpers/Logger";

const logger = new Logger();

export class InteractionCreate {

    async do(interaction: Interaction) {
        if(interaction.isCommand()) this.handleCommandInteractions(interaction);
    }

    private async handleCommandInteractions(interaction: CommandInteraction) {
        for(let e of commands) {
            if(interaction.commandName == e.info.name) return e.onTriggered(interaction.client, interaction);
        }
        interaction.reply("Interaction is not registered (or a bigger problem)");
        logger.log( { LEVEL: 4, MESSAGE: `Interaction (${interaction.commandName}) not found!`, SENDER: "InteractionCreate.ts:19", TYPE: "ERROR" } );
    }
}