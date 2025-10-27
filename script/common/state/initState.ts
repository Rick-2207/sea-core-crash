import { injectable } from "../../system/dependency/dependency";
import { IGameState } from "./gameState.interface";
@injectable("InitState")
export class InitState implements IGameState {
    name: string = 'Init';
    
    onEnter(): void {
        console.log('InitState onEnter');
    }
    
    bet: () => void;
    updateBet: (bet: number) => void;
    cashout: () => void;

    onExit(): void {
        console.log('InitState onExit');
    }
}