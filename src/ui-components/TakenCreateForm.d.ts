/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TakenCreateFormInputValues = {
    userId?: string;
    courseId?: string;
    status?: string;
};
export declare type TakenCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    courseId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TakenCreateFormOverridesProps = {
    TakenCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    courseId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TakenCreateFormProps = React.PropsWithChildren<{
    overrides?: TakenCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TakenCreateFormInputValues) => TakenCreateFormInputValues;
    onSuccess?: (fields: TakenCreateFormInputValues) => void;
    onError?: (fields: TakenCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TakenCreateFormInputValues) => TakenCreateFormInputValues;
    onValidate?: TakenCreateFormValidationValues;
} & React.CSSProperties>;
export default function TakenCreateForm(props: TakenCreateFormProps): React.ReactElement;
