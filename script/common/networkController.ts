import { injectable } from "../system/dependency";
import { DI_KEYS } from "./config/diConfig.dynamicRegistry";
import { INetworkController } from "./crash-core.interface";

@injectable(DI_KEYS.NETWORK_CONTROLLER)
export class NetworkController implements INetworkController {

    constructor() { }

    public connect(): void {
        console.log('NetworkController connect');
    }
    public disconnect(): void {
        console.log('NetworkController disconnect');
    }
    public sendMessage(message: string): void {
        console.log('NetworkController sendMessage', message);
    }
    public receiveMessage(): void {
        console.log('NetworkController receiveMessage');
    }
}