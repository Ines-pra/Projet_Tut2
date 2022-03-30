import ClientDAO from "../ClientDAO";
import { sqlClientDAO } from "../sql/sqlClientDAO";

export default class sqlDAOFactory{

    public getClientDAO(): ClientDAO {
        return new sqlClientDAO();
    }
}