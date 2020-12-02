import { TokenType } from "./tokens";
export interface CLexerInputSource extends Iterable<string> {
}
export declare type Tokens = {
    type: TokenType;
    value: string;
};
export default class CLexer {
    protected input: CLexerInputSource;
    protected tokens: Tokens[];
    constructor(input: CLexerInputSource);
    protected lex(): void;
}
