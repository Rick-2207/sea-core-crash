import { inject, injectable } from "../system/dependency/dependency";
import { StateMachine } from "../system/stateMachine/stateMachine";
import { DI_KEYS } from "./config/diConfig.dynamicRegistry";
import { IGameController, INetworkController } from "./crash-core.interface";
import { IGameState } from "./state/gameState.interface";

@injectable(DI_KEYS.GAME_CONTROLLER)
export class MainGameController implements IGameController {
    protected stateMachine: StateMachine;
    protected get currentState(): IGameState {
        return this.stateMachine.getCurrentState() as IGameState;
    }

    @inject(DI_KEYS.IDLE_STATE)
    private idleState: IGameState;

    @inject(DI_KEYS.INIT_STATE)
    private initState: IGameState;

    @inject(DI_KEYS.BET_STATE)
    private betState: IGameState;

    @inject(DI_KEYS.PLAY_STATE)
    private playState: IGameState;

    @inject(DI_KEYS.RESULT_STATE)
    private resultState: IGameState;

    @inject(DI_KEYS.EXIT_STATE)
    private exitState: IGameState;

    @inject(DI_KEYS.NETWORK_CONTROLLER)
    private networkController: INetworkController;

    constructor() {
        this.initStateMachine();
    }

    public initStateMachine(): void {
        this.stateMachine = new StateMachine();
        this.stateMachine.addStates([
            this.idleState,
            this.initState,
            this.betState,
            this.playState,
            this.resultState,
            this.exitState]);
        this.stateMachine.addTransitions([
            { from: this.idleState.name, to: this.initState.name, onTransition: () => console.log('Transitioning to Init') },
            { from: this.initState.name, to: this.betState.name, onTransition: () => console.log('Transitioning to Bet') },
            { from: this.betState.name, to: this.playState.name, onTransition: () => console.log('Transitioning to Play') },
            { from: this.playState.name, to: this.resultState.name, onTransition: () => console.log('Transitioning to Result') },
            { from: this.resultState.name, to: this.initState.name, onTransition: () => console.log('Transitioning to Init') },
            { from: '*', to: this.exitState.name, onTransition: () => console.log('Transitioning to Exit') }
        ]);
        this.stateMachine.setInitialState(this.idleState.name);
        console.log('initStateMachine');
    }

    public transitionTo(stateName: string): void {
        this.stateMachine.transitionTo(stateName);
    }

    public updateBet(bet: number): void {
        this.currentState.updateBet(bet);
    }

    public cashout(): void {
        this.currentState.cashout();
    }

    public bet(): void {
        this.currentState.bet();
    }
}