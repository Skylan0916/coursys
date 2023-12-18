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
export declare type TakenUpdateFormInputValues = {
    userId?: string;
    courseId?: string;
    status?: string;
};
export declare type TakenUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    courseId?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TakenUpdateFormOverridesProps = {
    TakenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    courseId?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TakenUpdateFormProps = React.PropsWithChildren<{
    overrides?: TakenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    taken?: any;
    onSubmit?: (fields: TakenUpdateFormInputValues) => TakenUpdateFormInputValues;
    onSuccess?: (fields: TakenUpdateFormInputValues) => void;
    onError?: (fields: TakenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TakenUpdateFormInputValues) => TakenUpdateFormInputValues;
    onValidate?: TakenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TakenUpdateForm(props: TakenUpdateFormProps): React.ReactElement;
