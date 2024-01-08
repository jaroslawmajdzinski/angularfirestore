import { Observable } from "rxjs";
import { TailwindThemeService } from "./theme.service";

function initializeAppFactory(themeService: TailwindThemeService): () => Observable<any> {
    return () => themeService.loadConfig()
   }

   