import { DI_KEYS, DIKeyRegistry } from "./script/common/config/diConfig.dynamicRegistry";
import { GAME_CONFIG, GameConfigRegistry } from "./script/common/config/gameConfig.dynamicRegistry";
import { GameContainer, getGameController } from "./script/common/gameContainer";
import { MainGameController } from "./script/common/mainGameController";
import { NetworkController } from "./script/common/networkController";
import { BetState } from "./script/common/state/betState";
import { ExitState } from "./script/common/state/exitState";
import { IdleState } from "./script/common/state/idleState";
import { InitState } from "./script/common/state/initState";
import { PlayState } from "./script/common/state/playState";
import { ResultState } from "./script/common/state/resultState";
import { DependencyContainer, DependencyLifetime, Constructor, resolve, inject, injectable } from "./script/system/dependency";
import { StateMachine } from "./script/system/stateMachine/stateMachine";


export {
    DependencyContainer,
    DependencyLifetime,
    Constructor,
    injectable,
    inject,
    resolve,
    GAME_CONFIG,
    GameConfigRegistry,
    DI_KEYS,
    DIKeyRegistry,
    StateMachine,
    IdleState,
    InitState,
    BetState,
    PlayState,
    ResultState,
    ExitState,
    MainGameController,
    NetworkController,
    GameContainer,
    getGameController,
}

