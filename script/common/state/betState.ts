import { injectable } from "../../system/dependency/dependency";
import { IGameState } from "./gameState.interface";
@injectable("BetState")
export class BetState implements IGameState {
    name: string = 'Bet';
    
    bet(): void {
        console.log('BetState bet');
    }
    
    updateBet(bet: number): void {
        console.log('BetState updateBet', bet);
    }
    
    cashout: () => void;
    
    onEnter(): void {
        console.log('BetState onEnter');
    }
    
    onExit(): void {
        console.log('InitState onExit');
    }
}