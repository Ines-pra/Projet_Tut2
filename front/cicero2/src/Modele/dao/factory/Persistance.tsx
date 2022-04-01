/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from 'react-redux';

export default function Persistance(){
    const env = useSelector((state: any) => state.env.environnement);
    return env;
} 