export type CommandMap = {
    [key: string]: Command | CommandMap;
};

export abstract class Command {
    abstract execute(args: any): Promise<void> | null;
}