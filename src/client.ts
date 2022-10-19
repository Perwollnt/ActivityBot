import { Client, Interaction } from "discord.js";
import { ActivityCommand } from "./commands/ActivityCommand";
import { ActivityHUCommand } from "./commands/ActivityCommandHU";
import { InteractionCreate } from "./events/InteractionCreate";
import { GetStuff } from "./helpers/GetStuff";
import { Handlers } from "./helpers/Handlers";
import { SlashCommandInterface } from "./interfaces/CommandInterface";



const client = GetStuff.getClient();


export const commands: Array<SlashCommandInterface> = [
    new ActivityCommand(),
    new ActivityHUCommand(),
];

Handlers.command(client, commands);

export class BotClient {

    interactionHandler = new InteractionCreate();

    constructor(token: string) {
        client.login(token);
        client.on("ready", (client: Client) => console.log("=====================\n",client.user?.username, "is ready!", "\n====================="));
        client.on("interactionCreate", (int: Interaction) => this.interactionHandler.do(int));
    }
}