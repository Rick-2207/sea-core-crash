import { injectable } from "../../system/dependency/dependency";
import { IState } from "../../system/stateMachine/stateMachine";
@injectable("IdleState")
export class IdleState implements IState {
    name: string = 'Idle';
    
    onEnter(): void {
        console.log('IdleState onEnter');
    }
    
    onExit(): void {
        console.log('IdleState onExit');
    }
}