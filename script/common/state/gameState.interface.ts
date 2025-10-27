import { IState } from "../../system/stateMachine/stateMachine";

export interface IGameState extends IState {
    onEnter: () => void;
    onExit: () => void;
    bet: () => void;
    updateBet: (bet: number) => void;
    cashout: () => void;
}