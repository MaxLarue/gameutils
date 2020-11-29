export declare type Transition<StateType> = {
    from: StateType;
    to: StateType;
};
export declare type Transitions<StateType> = Transition<StateType>[];
export default abstract class AbstractFsm<StateType> {
    protected state: StateType;
    constructor();
    abstract get initialState(): StateType;
    abstract get transitions(): Transitions<StateType>;
    getState(): StateType;
    transitionTo(state: StateType): AbstractFsm<StateType>;
    canTransitionTo(state: StateType): boolean;
    protected init(): void;
    protected getTransitionsFrom(from: StateType): Transitions<StateType>;
    protected getTransitionsTo(to: StateType): Transitions<StateType>;
}
