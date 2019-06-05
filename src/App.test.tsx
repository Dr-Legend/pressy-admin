import "reflect-metadata";
import { AuthenticationService } from "./client/api/authentication.service";
import { Container } from "inversify";
import { ApiServiceBinder } from "./client/ApiServiceBinder";
import { TYPES } from "./client/variables";

it("Makes Http request without failing", async done => {
  let container = new Container();
  ApiServiceBinder.with(container);
  let authenticationService = container.get<AuthenticationService>(TYPES.AuthenticationService);
  let response = await authenticationService.authLogin({
    email: "dogga.nidhal@gmail.com",
    password: "qwertyazerty2019"
  })
  .toPromise();
  console.log(JSON.stringify(response, null, 2));
  done();
});
