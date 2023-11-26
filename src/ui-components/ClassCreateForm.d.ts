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
export declare type ClassCreateFormInputValues = {
    title?: string;
    instructor?: string;
    semester?: string;
    time?: string;
    campus?: string;
    description?: string;
    capacity?: number;
    enrollment?: number;
};
export declare type ClassCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    instructor?: ValidationFunction<string>;
    semester?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    campus?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    capacity?: ValidationFunction<number>;
    enrollment?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClassCreateFormOverridesProps = {
    ClassCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    instructor?: PrimitiveOverrideProps<TextFieldProps>;
    semester?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    campus?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    capacity?: PrimitiveOverrideProps<TextFieldProps>;
    enrollment?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClassCreateFormProps = React.PropsWithChildren<{
    overrides?: ClassCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ClassCreateFormInputValues) => ClassCreateFormInputValues;
    onSuccess?: (fields: ClassCreateFormInputValues) => void;
    onError?: (fields: ClassCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClassCreateFormInputValues) => ClassCreateFormInputValues;
    onValidate?: ClassCreateFormValidationValues;
} & React.CSSProperties>;
export default function ClassCreateForm(props: ClassCreateFormProps): React.ReactElement;
