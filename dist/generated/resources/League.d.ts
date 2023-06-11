/**
 * A league.
 */
export interface League {
    /**
     * The unique identifier for a league
     */
    id: number;
    /**
     * An image corellated with league
     */
    imageUrl: string;
    /**
     * Leagues name
     */
    name: string;
    [property: string]: any;
}
export declare class LeagueConverter {
    static toLeague(json: string): League;
    static leagueToJson(value: League): string;
}
