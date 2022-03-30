import ClientDAO from "../ClientDAO";
import { localClientDAO } from "../local/localClientDAO";

export default class localDAOFactory{

    public getClientDAO(): ClientDAO {
        return new localClientDAO();
    }
}