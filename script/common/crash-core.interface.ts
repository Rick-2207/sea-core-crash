export interface IGameController {
    initStateMachine: () => void;
    transitionTo: (stateName: string) => void;
    updateBet: (bet: number) => void;
    cashout: () => void;
    bet: () => void;
}

export interface INetworkController {
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
    receiveMessage: () => void;
}