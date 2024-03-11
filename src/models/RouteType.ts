import { ReactNode } from "react";

export interface RouteType {
    path: string,
    label: string,
    element: ReactNode,
    roles: string[],
    displayRole: string[]
}