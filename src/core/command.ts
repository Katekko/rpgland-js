export abstract class Command {
    abstract execute(args: any): Promise<void> | null;
}