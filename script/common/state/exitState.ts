import { injectable } from "../../system/dependency/dependency";
import { IState } from "../../system/stateMachine/stateMachine";
@injectable("ExitState")
export class ExitState implements IState {
    name: string = 'Exit';
    
    onEnter(): void {
        console.log('ExitState onEnter');
    }
    
    onExit(): void {
        console.log('ExitState onExit');
    }
}