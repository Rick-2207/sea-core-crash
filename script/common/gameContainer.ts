import { DependencyContainer, DependencyLifetime } from "../system/dependency";
import { DI_KEYS } from "./config/diConfig.dynamicRegistry";
import { IdleState } from "./state/idleState";
import { InitState } from "./state/initState";
import { BetState } from "./state/betState";
import { PlayState } from "./state/playState";
import { ResultState } from "./state/resultState";
import { ExitState } from "./state/exitState";
import { MainGameController } from "./mainGameController";
import { NetworkController } from "./networkController";
import { IGameController } from "./crash-core.interface";

export class GameContainer {
    private static container: DependencyContainer;

    public static initialize(): void {
        console.log('Starting Game Container initialization...\n');

        this.container = DependencyContainer.getInstance();

        this.registerNetworkController();
        this.registerGameStates();
        this.registerGameController();
        this.resolveAll();
    }

    private static registerGameStates(): void {
        this.container.bind(DI_KEYS.IDLE_STATE, IdleState, DependencyLifetime.Transient);
        this.container.bind(DI_KEYS.INIT_STATE, InitState, DependencyLifetime.Transient);
        this.container.bind(DI_KEYS.BET_STATE, BetState, DependencyLifetime.Transient);
        this.container.bind(DI_KEYS.PLAY_STATE, PlayState, DependencyLifetime.Transient);
        this.container.bind(DI_KEYS.RESULT_STATE, ResultState, DependencyLifetime.Transient);
        this.container.bind(DI_KEYS.EXIT_STATE, ExitState, DependencyLifetime.Transient);
    }

    private static registerNetworkController(): void {
        this.container.bind(DI_KEYS.NETWORK_CONTROLLER, NetworkController, DependencyLifetime.Singleton);
    }

    private static registerGameController(): void {
        this.container.bind(DI_KEYS.GAME_CONTROLLER, MainGameController, DependencyLifetime.Singleton,
            [
                DI_KEYS.IDLE_STATE,
                DI_KEYS.INIT_STATE,
                DI_KEYS.BET_STATE,
                DI_KEYS.PLAY_STATE,
                DI_KEYS.RESULT_STATE,
                DI_KEYS.EXIT_STATE,
            ]);
    }

    private static resolveAll(): void {
        this.container.resolve(DI_KEYS.GAME_CONTROLLER);
        this.container.resolve(DI_KEYS.NETWORK_CONTROLLER);
    }

    public static resolve<T>(key: string): T {
        return this.container.resolve<T>(key);
    }

    public static has(key: string): boolean {
        return this.container.has(key);
    }

    public static getGameController(): IGameController {
        return this.container.get<IGameController>(DI_KEYS.GAME_CONTROLLER);
    }

    public static reset(): void {
        DependencyContainer.reset();
        this.container = DependencyContainer.getInstance();
    }
}

export function getGameController(): IGameController {
    return GameContainer.getGameController();
}