import { SlashCommandBuilder, Client, CommandInteraction, CacheType, ChannelType, GuildChannel, CommandInteractionOption, REST, EmbedBuilder, GuildMember } from "discord.js";
import { CommandInfo, SlashCommandInterface } from "../interfaces/CommandInterface";
import { config } from "dotenv";
import { MessagesSettings } from "../settings/Messages";
import { Embed } from "../settings/embed";
import { activities } from "../settings/system";

config();

const messagesconfig = MessagesSettings.messagesSettings;
const e = new Embed()

export class ActivityCommand implements SlashCommandInterface {

    info: CommandInfo = {
        name: "activity",
        description: "start an activity",
        example: "activity Fishington",
        usage: "activity [<activityname>]"
    };

    builder: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = new SlashCommandBuilder()
    .setName(this.info.name).setDescription(this.info.description)
    .addStringOption(so => so.setName("activity_name").setDescription("description").setRequired(true).addChoices(
        { name: "Youtube and chill", value: "880218394199220334", name_localizations: { hu: "Youtube and chill" } },
        { name: "Fishington", value: "814288819477020702", name_localizations: { hu: "Fishington" } },
        { name: "Chess in the park", value: "832012774040141894", name_localizations: { hu: "Chess in the park" } },
        { name: "Checkers in the park", value: "832013003968348200", name_localizations: { hu: "Checkers in the park" } },
        //{ name: "Sketchy artist", value: "879864070101172255", name_localizations: { hu: "Művészi vázlatok" } },
        { name: "Sketch Heads", value: "902271654783242291", name_localizations: { hu: "Sketch Heads" } },
        { name: "Awkword", value: "879863881349087252", name_localizations: { hu: "Awkword" } },
        //{ name: "Doodle crew", value: "878067389634314250", name_localizations: { hu: "Rajz legénység" } },
        { name: "Ocho", value: "832025144389533716", name_localizations: { hu: "Ocho" } },
        { name: "Betrayal", value: "773336526917861400", name_localizations: { hu: "Betrayal" } },
        { name: "Word Snacks", value: "879863976006127627", name_localizations: { hu: "Word Snacks" } },
        { name: "Letter League", value: "879863686565621790", name_localizations: { hu: "Letter League" } },
        { name: "Poker night", value: "755827207812677713", name_localizations: { hu: "Poker night" } },
        { name: "Putt party", value: "945737671223947305", name_localizations: { hu: "Putt party" } },
        { name: "SpellCast", value: "852509694341283871", name_localizations: { hu: "SpellCast" } },
        { name: "DEV_PN", value: "763133495793942528", name_localizations: { hu: "DEV_PN" } },
        //{ name: "DEV_Decoders", value: "891001866073296967", name_localizations: { hu: "DEV_Kódfejtők" } },
        { name: "DEV_CG4", value: "832013108234289153", name_localizations: { hu: "DEV_CG4" } },
    )); 

    private activities = activities;
    private member!: GuildMember;
    private userChannel!: GuildChannel;
    private link!: string;
    private embed!: EmbedBuilder;
    private interactionName: string = "ERR";

    async onTriggered(client: Client<boolean>, interaction: CommandInteraction<CacheType>) {

        this.member = await interaction.guild?.members.fetch(interaction.user.id)!;
        this.userChannel = this.member?.voice.channel!;

        if(!this.userChannel) return interaction.reply(messagesconfig.user.is.not.in.a.channel);
        if(this.userChannel.type == ChannelType.GuildStageVoice) return interaction.reply(messagesconfig.user.is.not.in.a.channel);

        this.link = `https://discord.gg/${await this.getInvite(this.userChannel, interaction.options.get("activity_name"), interaction)}`;
        this.embed = new EmbedBuilder()
        .setDescription(await this.placeholders(e.description, interaction))
        .setTitle(await this.placeholders(e.title, interaction))
        .setColor(`#${e.color.replaceAll("#", "")}`)
        .setFooter(e.footer)
        .setURL(this.link);
        
        if(!interaction.replied) return interaction.reply({ embeds: [this.embed] });
        return;
    }

    

    

    async placeholders(text: string, int: CommandInteraction) {
        Object.entries(this.activities).forEach(ac => {
            const stuff = { id: parseInt(ac[0]), name: ac[1], };
            if(stuff.id == int.options.data[0].value as number) this.interactionName = stuff.name;
        });

        return text
        .replaceAll("%activity", this.interactionName)
        .replaceAll("%link%", this.link)
        .replaceAll("%room.id%", this.userChannel.id)
        .replaceAll("%user.id%", this.member.id)
    }

    async getInvite(userChannel: GuildChannel, option: CommandInteractionOption<CacheType> | null, interaction: CommandInteraction) {
        const rest: any = new REST({ version: "8" }).setToken(process.env.TOKEN!);
        let res: any;


        try {
            res = await rest.post(`/channels/${userChannel.id}/invites`, {
                body: { max_age: 86400, max_uses: 0, target_application_id: option?.value, target_type: 2, temporary: false, validate: null, } 
            })
        } catch (err) {
            //@ts-expect-error
            return interaction.reply({ ephemeral: true, content: `HIBA: ${err.rawError.message}, ${err.rawError.code}` })
        }
        return res.code;
    }
    
}