import { AbstractFsm } from "../Fsm";
import { Transitions } from "../Fsm/AbstractFsm";
export declare enum TokenType {
    IDENTIFIER = 0,
    GROUP_OPEN = 1,
    GROUP_CLOSE = 2,
    IDLE = 3,
    INVALID = 4
}
export declare const TrashTokens: string[];
export declare class TokenFsm extends AbstractFsm<TokenType> {
    get initialState(): TokenType;
    get transitions(): Transitions<TokenType>;
}
