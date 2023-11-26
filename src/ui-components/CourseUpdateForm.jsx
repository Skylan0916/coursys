/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCourse } from "../graphql/queries";
import { updateCourse } from "../graphql/mutations";
const client = generateClient();
export default function CourseUpdateForm(props) {
  const {
    id: idProp,
    course: courseModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    subject: "",
    number: "",
    point: "",
    title: "",
    description: "",
    is_required: false,
    is_breath: false,
    is_elective: false,
  };
  const [subject, setSubject] = React.useState(initialValues.subject);
  const [number, setNumber] = React.useState(initialValues.number);
  const [point, setPoint] = React.useState(initialValues.point);
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [is_required, setIs_required] = React.useState(
    initialValues.is_required
  );
  const [is_breath, setIs_breath] = React.useState(initialValues.is_breath);
  const [is_elective, setIs_elective] = React.useState(
    initialValues.is_elective
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = courseRecord
      ? { ...initialValues, ...courseRecord }
      : initialValues;
    setSubject(cleanValues.subject);
    setNumber(cleanValues.number);
    setPoint(cleanValues.point);
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setIs_required(cleanValues.is_required);
    setIs_breath(cleanValues.is_breath);
    setIs_elective(cleanValues.is_elective);
    setErrors({});
  };
  const [courseRecord, setCourseRecord] = React.useState(courseModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCourse.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCourse
        : courseModelProp;
      setCourseRecord(record);
    };
    queryData();
  }, [idProp, courseModelProp]);
  React.useEffect(resetStateValues, [courseRecord]);
  const validations = {
    subject: [{ type: "Required" }],
    number: [{ type: "Required" }],
    point: [{ type: "Required" }],
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    is_required: [{ type: "Required" }],
    is_breath: [{ type: "Required" }],
    is_elective: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          subject,
          number,
          point,
          title,
          description,
          is_required,
          is_breath,
          is_elective,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateCourse.replaceAll("__typename", ""),
            variables: {
              input: {
                id: courseRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CourseUpdateForm")}
      {...rest}
    >
      <TextField
        label="Subject"
        isRequired={true}
        isReadOnly={false}
        value={subject}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject: value,
              number,
              point,
              title,
              description,
              is_required,
              is_breath,
              is_elective,
            };
            const result = onChange(modelFields);
            value = result?.subject ?? value;
          }
          if (errors.subject?.hasError) {
            runValidationTasks("subject", value);
          }
          setSubject(value);
        }}
        onBlur={() => runValidationTasks("subject", subject)}
        errorMessage={errors.subject?.errorMessage}
        hasError={errors.subject?.hasError}
        {...getOverrideProps(overrides, "subject")}
      ></TextField>
      <TextField
        label="Number"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={number}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              subject,
              number: value,
              point,
              title,
              description,
              is_required,
              is_breath,
              is_elective,
            };
            const result = onChange(modelFields);
            value = result?.number ?? value;
          }
          if (errors.number?.hasError) {
            runValidationTasks("number", value);
          }
          setNumber(value);
        }}
        onBlur={() => runValidationTasks("number", number)}
        errorMessage={errors.number?.errorMessage}
        hasError={errors.number?.hasError}
        {...getOverrideProps(overrides, "number")}
      ></TextField>
      <TextField
        label="Point"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={point}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              subject,
              number,
              point: value,
              title,
              description,
              is_required,
              is_breath,
              is_elective,
            };
            const result = onChange(modelFields);
            value = result?.point ?? value;
          }
          if (errors.point?.hasError) {
            runValidationTasks("point", value);
          }
          setPoint(value);
        }}
        onBlur={() => runValidationTasks("point", point)}
        errorMessage={errors.point?.errorMessage}
        hasError={errors.point?.hasError}
        {...getOverrideProps(overrides, "point")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject,
              number,
              point,
              title: value,
              description,
              is_required,
              is_breath,
              is_elective,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              subject,
              number,
              point,
              title,
              description: value,
              is_required,
              is_breath,
              is_elective,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SwitchField
        label="Is required"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_required}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              subject,
              number,
              point,
              title,
              description,
              is_required: value,
              is_breath,
              is_elective,
            };
            const result = onChange(modelFields);
            value = result?.is_required ?? value;
          }
          if (errors.is_required?.hasError) {
            runValidationTasks("is_required", value);
          }
          setIs_required(value);
        }}
        onBlur={() => runValidationTasks("is_required", is_required)}
        errorMessage={errors.is_required?.errorMessage}
        hasError={errors.is_required?.hasError}
        {...getOverrideProps(overrides, "is_required")}
      ></SwitchField>
      <SwitchField
        label="Is breath"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_breath}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              subject,
              number,
              point,
              title,
              description,
              is_required,
              is_breath: value,
              is_elective,
            };
            const result = onChange(modelFields);
            value = result?.is_breath ?? value;
          }
          if (errors.is_breath?.hasError) {
            runValidationTasks("is_breath", value);
          }
          setIs_breath(value);
        }}
        onBlur={() => runValidationTasks("is_breath", is_breath)}
        errorMessage={errors.is_breath?.errorMessage}
        hasError={errors.is_breath?.hasError}
        {...getOverrideProps(overrides, "is_breath")}
      ></SwitchField>
      <SwitchField
        label="Is elective"
        defaultChecked={false}
        isDisabled={false}
        isChecked={is_elective}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              subject,
              number,
              point,
              title,
              description,
              is_required,
              is_breath,
              is_elective: value,
            };
            const result = onChange(modelFields);
            value = result?.is_elective ?? value;
          }
          if (errors.is_elective?.hasError) {
            runValidationTasks("is_elective", value);
          }
          setIs_elective(value);
        }}
        onBlur={() => runValidationTasks("is_elective", is_elective)}
        errorMessage={errors.is_elective?.errorMessage}
        hasError={errors.is_elective?.hasError}
        {...getOverrideProps(overrides, "is_elective")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || courseModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || courseModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
