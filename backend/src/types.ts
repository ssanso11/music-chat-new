import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import {Request, Response} from 'express';

// to declare userId within express session 
declare module 'express-session' {
    interface Session {
       userId: number;
     }
}

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request;
    res: Response;
}