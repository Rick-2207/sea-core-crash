import { injectable } from "../../system/dependency/dependency";
import { IGameState } from "./gameState.interface";
@injectable("PlayState")
export class PlayState implements IGameState {
    name: string = 'Play';
    
    onEnter(): void {
        console.log('PlayState onEnter');
    }
    
    bet: () => void;
    updateBet: (bet: number) => void;
    
    cashout(): void {
        console.log('PlayState cashout');
    }

    onExit(): void {
        console.log('PlayState onExit');
    }
}