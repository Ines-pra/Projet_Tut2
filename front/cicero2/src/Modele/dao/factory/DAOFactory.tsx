import localDAOFactory from './localDAOFactory';
import sqlDAOFactory from './sqlDAOFactory';
import ClientDAO from '../ClientDAO';
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
}