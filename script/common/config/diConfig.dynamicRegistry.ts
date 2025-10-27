export class DIKeyRegistry {
    private static keys: Record<string, string> = {
        CONFIG: 'Config',

        STATE_MACHINE: 'StateMachine',

        IDLE_STATE: 'IdleState',
        INIT_STATE: 'InitState',
        BET_STATE: 'BetState',
        PLAY_STATE: 'PlayState',
        RESULT_STATE: 'ResultState',
        EXIT_STATE: 'ExitState',

        GAME_CONTROLLER: 'MainGameController',
        GAME_STATE_MANAGER: 'GameStateManager',

        NETWORK_CONTROLLER: 'NetworkController',
    };

    static register(keyName: string, keyValue: string): void {
        if (this.keys[keyName]) {
            console.warn(`DI Key "${keyName}" already exists`);
        }
        this.keys[keyName] = keyValue;
    }

    static registerMany(keys: Record<string, string>): void {
        Object.entries(keys).forEach(([key, value]) => {
            this.register(key, value);
        });
    }

    static get(keyName: string): string {
        return this.keys[keyName];
    }

    static getAll(): Record<string, string> {
        return { ...this.keys };
    }
}

export const DI_KEYS = DIKeyRegistry.getAll();