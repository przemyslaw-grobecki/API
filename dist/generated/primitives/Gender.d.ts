/**
 * A pokemon's gender.
 */
export declare enum Gender {
    Empty = "\u2640",
    Gender = "\u2642"
}
export declare class Convert {
    static toGender(json: string): Gender;
    static genderToJson(value: Gender): string;
}
