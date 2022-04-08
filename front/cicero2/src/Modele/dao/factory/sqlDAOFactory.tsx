import ClientDAO from "../ClientDAO";
import CaseDAO from "../CaseDAO";
import EventDAO from "../EventDAO";
import { sqlClientDAO } from "../sql/sqlClientDAO";
import { sqlCaseDAO } from "../sql/sqlCaseDAO";
import { sqlEventDAO } from "../sql/sqlEventDAO";

export default class sqlDAOFactory{

    public getClientDAO(): ClientDAO {
        return new sqlClientDAO();
    }

    public getCaseDAO(): CaseDAO {
        return new sqlCaseDAO();
    }

    public getEventDAO(): EventDAO {
        return new sqlEventDAO();
    }
}