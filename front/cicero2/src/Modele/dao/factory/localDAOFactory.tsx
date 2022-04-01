import ClientDAO from "../ClientDAO";
import CaseDAO from "../CaseDAO";
import EventDAO from "../EventDAO";
import { localClientDAO } from "../local/localClientDAO";
import { localCaseDAO } from "../local/localCaseDAO";
import { localEventDAO } from "../local/localEventDAO";

export default class localDAOFactory{

    public getClientDAO(): ClientDAO {
        return new localClientDAO();
    }

    public getCaseDAO(): CaseDAO {
        return new localCaseDAO();
    }

    public getEventDAO(): EventDAO {
        return new localEventDAO();
    }
}