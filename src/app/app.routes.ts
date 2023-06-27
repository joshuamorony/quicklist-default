import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: "home",
    loadComponent: () => import("./home/home.component"),
  },
  {
    path: "checklist/:id",
    loadComponent: () => import("./checklist/checklist.component"),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
