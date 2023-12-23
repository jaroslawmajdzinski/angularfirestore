export interface IActionAreaConfig {
    label: string;
    color: "primary" | "secondary" | "accent" | "danger";
    dismiss?: boolean
}

export interface IDialogConfig{
    title: string;
    message: string;
    actionAreaConfig: IActionAreaConfig[]
}