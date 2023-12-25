export interface IActionAreaConfig {
    label: string;
    color: "primary" | "secondary" | "accent" | "warn";
    dismiss?: boolean
}

export interface IDialogConfig{
    title: string;
    message: string;
    actionAreaConfig: IActionAreaConfig[]
}