/**
 * A pokemon move's category.
 */
export declare enum Category {
    Physical = "Physical",
    Special = "Special",
    Status = "Status"
}
export declare class Convert {
    static toCategory(json: string): Category;
    static categoryToJson(value: Category): string;
}
