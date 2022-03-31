import localDAOFactory from './localDAOFactory';
import sqlDAOFactory from './sqlDAOFactory';
import ClientDAO from '../ClientDAO';
import CaseDAO from '../CaseDAO';
import EventDAO from '../EventDAO';
import Persistance from './Persistance';

export default abstract class DAOFactory {
    public static getDAOFactory() {
        
        switch(Persistance()) {
            case "electron":
                return new localDAOFactory();
            case "web":
                return new sqlDAOFactory();
        }
    }
    public abstract getClientDAO(): ClientDAO;
    public abstract getCaseDAO(): CaseDAO;
    public abstract getEventDAO(): EventDAO;
}