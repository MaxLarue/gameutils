import AbstractFsm, { Transition } from "./AbstractFsm";
import { IEmitter, IListener, Emitter } from "../Events";
export default abstract class ObservableFsm<StateType> extends AbstractFsm<StateType> implements IEmitter<Transition<StateType>> {
    protected emitter: Emitter<Transition<StateType>>;
    constructor();
    transitionTo(state: StateType): AbstractFsm<StateType>;
    emit(event: Transition<StateType>): void;
    subscribe(listener: IListener<Transition<StateType>>): void;
    unSubscribe(listener: IListener<Transition<StateType>>): void;
    purge(): void;
}
