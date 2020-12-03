export default class TagManager {
    private tags;
    constructor(tags: string[]);
    hasTag(tag: string): boolean;
    hasAnyTag(tags: string[]): boolean;
}
