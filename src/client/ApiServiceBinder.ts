import {interfaces} from "inversify";

import { ArticlesService } from './api/articles.service';
import { AuthenticationService } from './api/authentication.service';
import { DriversService } from './api/drivers.service';
import { MembersService } from './api/members.service';
import { OrdersService } from './api/orders.service';
import { SlotsService } from './api/slots.service';
import { TYPES } from "./variables";
import IHttpClient from "./IHttpClient";
import HttpClient from "./HttpClient";
import { IAPIConfiguration } from "./IAPIConfiguration";

export class ApiServiceBinder {
    public static with(container: interfaces.Container) {
        container.bind<ArticlesService>(TYPES.ArticlesService).to(ArticlesService).inSingletonScope();
        container.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService).inSingletonScope();
        container.bind<DriversService>(TYPES.DriversService).to(DriversService).inSingletonScope();
        container.bind<MembersService>(TYPES.MembersService).to(MembersService).inSingletonScope();
        container.bind<OrdersService>(TYPES.OrdersService).to(OrdersService).inSingletonScope();
        container.bind<SlotsService>(TYPES.SlotsService).to(SlotsService).inSingletonScope();
        container.bind<IHttpClient>(TYPES.IApiHttpClient).to(HttpClient).inSingletonScope();
        container.bind<IAPIConfiguration>(TYPES.IAPIConfiguration).toConstantValue({});
    }
}
