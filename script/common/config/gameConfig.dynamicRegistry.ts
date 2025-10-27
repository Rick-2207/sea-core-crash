export class GameConfigRegistry {
    private static config: Record<string, any> = {
        GAME_ID: '1234567890',
        BET_CONFIG: [1000, 5000, 10000, 50000, 100000, 500000],
    };

    static register(keyName: string, keyValue: any): void {
        if (this.config[keyName]) {
            console.warn(`Game Config Key "${keyName}" already exists`);
        }
        this.config[keyName] = keyValue;
    }

    static registerMany(keys: Record<string, any>): void {
        Object.entries(keys).forEach(([key, value]) => {
            this.register(key, value);
        });
    }

    static get(keyName: string): any {
        return this.config[keyName];
    }

    static getAll(): Record<string, any> {
        return { ...this.config };
    }

    static update(keyName: string, keyValue: any): void {
        if (this.config[keyName]) {
            this.config[keyName] = keyValue;
        } else {
            console.warn(`Game Config Key "${keyName}" not found`);
        }
    }
}

export const GAME_CONFIG = GameConfigRegistry.getAll();