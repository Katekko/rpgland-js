import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/abstractions/command/command";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { ServiceFactory } from "../../../../core/factories/service.factory";
import { PlayerModel } from "../../../../core/models/player.model";
import { PlayersService } from "../../../../services/players.service";

class ConcreteCommand extends Command {
    constructor(loadPlayer: boolean | void) {
        super(loadPlayer);
    }
}

describe('Command', () => {
    const mockMessage = {} as Message;
    const mockPlayer = new PlayerModel('1', 'John Doe', '123456789', 10, 1000, 100, PlayerState.Idle, null, 20, [], 'en');


    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('constructor', () => {
        it('should initialize the Command instance with default values', () => {
            const command = new ConcreteCommand(true);

            expect(command.getLoadPlayer()).toBe(true);
            expect(command.translate).toBeDefined();
            expect(command.player).toBeNull();
        });

        it('should initialize the Command instance with provided loadPlayer value', () => {
            const command = new ConcreteCommand(false);

            expect(command.getLoadPlayer()).toBe(false);
            expect(command.translate).toBeDefined();
            expect(command.player).toBeNull();
        });
    });

    describe('execute', () => {
        it('should set the player and translate based on the message if loadPlayer is true', async () => {
            const command = new ConcreteCommand(true);
            let mockPlayersService = {
                getPlayerByMessage: jest.fn().mockResolvedValue(mockPlayer),
            } as unknown as PlayersService;

            jest.spyOn(ServiceFactory, 'makePlayersService').mockReturnValue(mockPlayersService);

            await command.execute(mockMessage, {});

            expect(ServiceFactory.makePlayersService).toHaveBeenCalled();
            expect(command.player).toBe(mockPlayer);
            expect(command.translate).toBeDefined();
            expect(command.translate.getLocale()).toBe(mockPlayer.language);
        });

        it('should not set the player and translate if loadPlayer is false', async () => {
            const command = new ConcreteCommand(false);
            let mockPlayersService = {
                getPlayerByMessage: jest.fn().mockResolvedValue(mockPlayer),
            } as unknown as PlayersService;

            jest.spyOn(ServiceFactory, 'makePlayersService').mockReturnValue(mockPlayersService);

            await command.execute(mockMessage, {});

            expect(command.getLoadPlayer()).toBe(false);
            expect(ServiceFactory.makePlayersService).not.toHaveBeenCalled();
            expect(command.player).toBeNull();
            expect(command.translate).toBeDefined();
            expect(command.translate.getLocale()).toBe('pt_BR');
        });

        it('should log the error if an error occurs', async () => {
            const mockError = new Error('Something went wrong');
            jest.spyOn(console, 'log').mockImplementation();

            const playersService = ServiceFactory.makePlayersService();
            jest.spyOn(playersService, 'getPlayerByMessage').mockRejectedValue(mockError);

            const command = new ConcreteCommand(true);

            await command.execute(mockMessage, {});

            expect(console.log).toHaveBeenCalledWith(mockError);
        });
    });
});
