import { injectable } from "../../system/dependency/dependency";
import { IGameState } from "./gameState.interface";
@injectable("ResultState")
export class ResultState implements IGameState {
    name: string = 'Result';
    
    onEnter(): void {
        console.log('ResultState onEnter');
    }
    
    bet: () => void;
    updateBet: (bet: number) => void;
    cashout: () => void;

    onExit(): void {
        console.log('ResultState onExit');
    }
}