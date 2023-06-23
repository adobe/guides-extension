/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import * as loader from "./loader";
import repository_panel from "./repository_panel";
import comment from "./comment";
export { default as repository_panel } from "./repository_panel";
export { default as Comment } from "./comment";

tcx?.extension?.register("repository_panel", "repository_panel");
tcx?.extension?.register("repository_panel", repository_panel);
tcx?.extension?.register("comment", comment);
