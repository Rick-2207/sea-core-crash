export interface IState {
    name: string;
    onEnter?: () => void;
    onExit?: () => void;
}

export interface ITransition {
    from: string;
    to: string;
    onTransition?: () => void;
}

export class StateMachine {
    private states: Map<string, IState>;
    private transitions: ITransition[];
    private currentState: IState | null;
    private isTransitioning: boolean;

    constructor() {
        this.states = new Map();
        this.transitions = [];
        this.currentState = null;
        this.isTransitioning = false;
    }


    public addState(state: IState): void {
        if (this.states.has(state.name)) {
            console.warn(`State "${state.name}" already exists, will be overwritten.`);
        }
        this.states.set(state.name, state);
    }

    public addStates(states: IState[]): void {
        states.forEach(state => this.addState(state));
    }

    public addTransition(transition: ITransition): void {
        if (transition.from !== "*" && !this.states.has(transition.from)) {
            console.error(`Source state "${transition.from}" does not exist.`);
            return;
        }
        if (!this.states.has(transition.to)) {
            console.error(`Target state "${transition.to}" does not exist.`);
            return;
        }
        this.transitions.push(transition);
    }

    public addTransitions(transitions: ITransition[]): void {
        transitions.forEach(transition => this.addTransition(transition));
    }

    public setInitialState(stateName: string): void {
        const state = this.states.get(stateName);
        if (!state) {
            console.error(`State "${stateName}" does not exist.`);
            return;
        }

        this.currentState = state;
        if (state.onEnter) {
            state.onEnter();
        }
    }

    public transitionTo(stateName: string, force: boolean = false): boolean {
        if (this.isTransitioning) {
            console.warn("Currently transitioning, please wait.");
            return false;
        }

        const targetState = this.states.get(stateName);
        if (!targetState) {
            console.error(`State "${stateName}" does not exist.`);
            return false;
        }

        if (!this.currentState) {
            console.error("No current state. Use setInitialState() first.");
            return false;
        }

        if (this.currentState.name === stateName) {
            console.warn(`Already in state "${stateName}".`);
            return false;
        }

        const validTransition = this.transitions.find(
            t => (t.from === this.currentState!.name || t.from === "*") && t.to === stateName
        );

        if (!validTransition && !force) {
            console.error(
                `No valid transition from "${this.currentState.name}" to "${stateName}".`
            );
            return false;
        }

        this.isTransitioning = true;

        if (this.currentState.onExit) {
            this.currentState.onExit();
        }

        const previousState = this.currentState.name;

        if (validTransition && validTransition.onTransition) {
            validTransition.onTransition();
        }

        this.isTransitioning = false;

        this.currentState = targetState;
        if (targetState.onEnter) {
            targetState.onEnter();
        }


        console.log(`Transitioned from state "${previousState}" to "${stateName}"`);
        return true;
    }

    public getCurrentState(): IState | null {
        return this.currentState;
    }

    public getCurrentStateName(): string | null {
        return this.currentState ? this.currentState.name : null;
    }

    public isInState(stateName: string): boolean {
        return this.currentState?.name === stateName;
    }

    public canTransitionTo(stateName: string): boolean {
        if (!this.currentState) return false;

        const transition = this.transitions.find(
            t => (t.from === this.currentState!.name || t.from === "*") && t.to === stateName
        );

        if (!transition) {
            return false;
        } else {
            return true;
        }
    }

    public getAllStates(): IState[] {
        return Array.from(this.states.values());
    }

    public getAllTransitions(): ITransition[] {
        return [...this.transitions];
    }

    public reset(): void {
        if (this.currentState && this.currentState.onExit) {
            this.currentState.onExit();
        }
        this.currentState = null;
        this.isTransitioning = false;
    }

    public clear(): void {
        this.reset();
        this.states.clear();
        this.transitions = [];
    }
}

