import { commandChar } from "./app";
import { commands, privateCommands } from "./commands";
import { Command, CommandMap } from "./core/abstractions/command/command";
import { BotInMaintenanceException } from "./core/exceptions/bot_in_maintenance.exception";
import { NotAllowedException } from "./core/exceptions/not_allowed.exception";
import { PlayerModel } from "./core/models/player.model";
import { TranslationEn } from "./i18n/en";
import { TranslationPtBr } from "./i18n/pt_br";
import { CommandTranslations } from "./i18n/translation";
import { CommonsService } from "./services/commons.service";
import { ItemsService } from "./services/items.service";
import { MobsService } from "./services/mobs.service";
import { PlayersService } from "./services/players.service";

export class CustomMessage {
    timestamp: number;
    phone: string;
    name: string;
    body: string;
    reply: (message: string) => void;
    isGroup: boolean;

    constructor(
        { timestamp, phone, body, reply, name, isGroup }:
            {
                timestamp: number, phone: string, body: string,
                reply: (message: string) => void, name: string,
                isGroup: boolean,
            }
    ) {
        this.timestamp = timestamp;
        this.phone = phone;
        this.body = body;
        this.reply = reply;
        this.name = name;
        this.isGroup = isGroup;
    }
}

export class HandleMessages {
    message: CustomMessage;
    commandChar: string;
    playersService: PlayersService;
    commonsService: CommonsService;
    mobsService: MobsService;
    itemsService: ItemsService;

    private cooldowns: { [playerId: string]: number } = {};

    constructor(
        { message, commandChar, playersService, commonsService, mobsService, itemsService }:
            {
                message: CustomMessage, commandChar: string,
                playersService: PlayersService, commonsService: CommonsService,
                mobsService: MobsService, itemsService: ItemsService,
            }
    ) {
        this.message = message;
        this.commandChar = commandChar;
        this.playersService = playersService;
        this.commonsService = commonsService;
        this.mobsService = mobsService;
        this.itemsService = itemsService;
    }

    private verifyIfNeedToIgnore(): boolean {
        const oneMinute = 60 * 1000;

        const messageTimestamp = this.message.timestamp;
        const currentTimestamp = Date.now();
        const messageDate = new Date(messageTimestamp * 1000);

        return currentTimestamp - messageDate.getTime() > oneMinute;
    }

    private verifyIfIsCommand(): boolean {
        return this.message.body.startsWith(commandChar)
    }

    private async defineLanguage(player: PlayerModel | null): Promise<CommandTranslations> {
        const ptBR = new TranslationPtBr(commandChar);
        const en = new TranslationEn(commandChar);
        if (player) {
            const lang = player.language;
            return lang == 'pt_BR' ? ptBR : en;
        } else {
            return this.message.phone.startsWith('55') ? ptBR : en;
        }
    }

    private verifyIfIsFlood(currentTime: number, cooldownDuration: number): boolean {
        const lastMessageTime = this.cooldowns[this.message.phone] || 0;
        const timeDifference = currentTime - lastMessageTime;
        return timeDifference < cooldownDuration;
    }

    private async validateWhitelist(i18n: CommandTranslations) {
        const commonsService = this.commonsService;
        const whitelist = await commonsService.getWhitelist();
        const phone = this.message.phone;
        const name = this.message.name;

        try {
            const foundNumber = whitelist.find(item => item.number === phone);
            if (!foundNumber) {
                throw new NotAllowedException();
            } else if (!foundNumber.allow) {
                throw new BotInMaintenanceException();
            }

        } catch (err) {
            if (err instanceof NotAllowedException) {
                console.log(`[RPG LAND] Not Authorized: ${name} | ${phone}`);
                this.message.reply(i18n.commands.commons.notAuthorized);
            } else if (err instanceof BotInMaintenanceException) {
                this.message.reply(i18n.commands.commons.botMaintenance);
                console.log(`[RPG LAND] Bot in Maintenance: ${name} | ${phone}`);
            } else {
                console.error(err);
                this.message.reply(i18n.commands.commons.somethingWrong);
            }

            throw err;
        }
    }

    private findCommand(commandLine: String, i18n: CommandTranslations, currentCommands: CommandMap = commands): Command | null {
        try {
            const commandParts = commandLine.split(' ');
            for (const command of commandParts) {
                if (currentCommands instanceof Command) {
                    return currentCommands;
                }

                if (!(command in currentCommands)) {
                    throw Error();
                }

                currentCommands = currentCommands[command] as CommandMap;
            }

            if (currentCommands instanceof Command) {
                return currentCommands;
            }

            throw Error();
        } catch (error) {
            this.message.reply(i18n.commands.commons.commandNotFound);
            return null;
        }
    }

    private findArguments(commandLine: string): string[] {
        const commandParts = commandLine.split(' ');
        const args: string[] = [];

        let currentCommand: CommandMap | Command = commands;

        for (let i = 0; i < commandParts.length; i++) {
            const commandPart = commandParts[i];

            if (typeof currentCommand === 'object' && commandPart in currentCommand) {
                currentCommand = (currentCommand as CommandMap)[commandPart] as Command | CommandMap;
            } else {
                args.push(commandPart);
            }
        }

        return args;
    }

    private commandOnlyForPrivate(i18n: CommandTranslations, command: Command): boolean {
        if (this.message.isGroup) {
            const commandType = command.constructor as typeof Command;
            if (privateCommands.includes(commandType)) {
                this.message.reply(i18n.commands.commons.commandOnlyForPrivate);
                return true;
            }
        }

        return false;
    }

    async handle() {
        try {
            if (this.verifyIfNeedToIgnore()) return;
            if (!this.verifyIfIsCommand()) return;
            const player = await this.playersService.getPlayerByMessage(this.message);
            const i18n = await this.defineLanguage(player);

            const currentTime = Date.now();
            const isFlood = this.verifyIfIsFlood(currentTime, 1000);
            if (isFlood) {
                this.message.reply(i18n.commands.commons.waitMessage);
                return;
            }

            this.validateWhitelist(i18n);

            const commandLine = this.message.body.split(commandChar)[1];
            const command = this.findCommand(commandLine, i18n);
            if (command == null) return null;
            if (this.commandOnlyForPrivate(i18n, command)) return;

            const args = this.findArguments(commandLine);

            command.injectDependencies(i18n, player,
                {
                    PlayersService: this.playersService,
                    CommonsService: this.commonsService,
                    MobsService: this.mobsService,
                    ItemsService: this.itemsService,
                },
            );
            command.execute(this.message, args);

            console.log(`[RPG LAND] ${(this.message.name)} ${this.message.body}`);

            this.cooldowns[this.message.phone] = currentTime;
        } catch (err) {
            console.log(`[RPG LAND] ${err}`);
        }
    }
}