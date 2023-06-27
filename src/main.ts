import { DialogModule } from "@angular/cdk/dialog";
import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { defaultStoreProvider} from "@state-adapt/angular";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(DialogModule), defaultStoreProvider],
}).catch((err) => console.log(err));
