import type React from "react";

export type TFormSingIn = {
    setEmailForConfirmationCode: React.Dispatch<React.SetStateAction<string>>;
    setCurrentComp: React.Dispatch<React.SetStateAction<TCurrentComp>>;
}

export type TConfirmedCode = {
    email: string;
    setCurrentComp: React.Dispatch<React.SetStateAction<TCurrentComp>>;
    forgotPassword: boolean
}

export type TForgotPassword = {
    setCurrentComp: React.Dispatch<React.SetStateAction<TCurrentComp>>;
    setEmailForConfirmationCode: React.Dispatch<React.SetStateAction<string>>;
    setForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TResetPassword = {
    setCurrentComp: React.Dispatch<React.SetStateAction<TCurrentComp>>;
}

export enum ECurrentComp {
    signIn = "signIn",
    confirmedCode = "confirmedCode",
    forgotPassword = "forgotPassword",
    resetPassword = "resetPassword"
}

export type TCurrentComp = "signIn" | "confirmedCode" | "forgotPassword" | "resetPassword";