import BaseApi from "../../BaseApi";
import { Move } from "../resources/Move";
export default class MoveApi extends BaseApi<Move> {
    /**	 * Standard CRUD	 */
    Post: (move: Move) => Promise<void>;
    Patch: (id: string, patch: Move) => Promise<Move>;
    Delete: (id: string) => Promise<void>;
    GetAll: () => Promise<Array<Move>>;
    Get: (id: string) => Promise<Move>;
}
