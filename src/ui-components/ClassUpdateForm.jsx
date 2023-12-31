/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getClass } from "../graphql/queries";
import { updateClass } from "../graphql/mutations";
const client = generateClient();
export default function ClassUpdateForm(props) {
  const {
    id: idProp,
    class: classModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    instructor: "",
    semester: "",
    time: "",
    campus: "",
    description: "",
    capacity: "",
    enrollment: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [instructor, setInstructor] = React.useState(initialValues.instructor);
  const [semester, setSemester] = React.useState(initialValues.semester);
  const [time, setTime] = React.useState(initialValues.time);
  const [campus, setCampus] = React.useState(initialValues.campus);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [capacity, setCapacity] = React.useState(initialValues.capacity);
  const [enrollment, setEnrollment] = React.useState(initialValues.enrollment);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = classRecord
      ? { ...initialValues, ...classRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setInstructor(cleanValues.instructor);
    setSemester(cleanValues.semester);
    setTime(cleanValues.time);
    setCampus(cleanValues.campus);
    setDescription(cleanValues.description);
    setCapacity(cleanValues.capacity);
    setEnrollment(cleanValues.enrollment);
    setErrors({});
  };
  const [classRecord, setClassRecord] = React.useState(classModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getClass.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getClass
        : classModelProp;
      setClassRecord(record);
    };
    queryData();
  }, [idProp, classModelProp]);
  React.useEffect(resetStateValues, [classRecord]);
  const validations = {
    title: [{ type: "Required" }],
    instructor: [{ type: "Required" }],
    semester: [{ type: "Required" }],
    time: [{ type: "Required" }],
    campus: [{ type: "Required" }],
    description: [{ type: "Required" }],
    capacity: [{ type: "Required" }],
    enrollment: [{ type: "Required" }],
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
          title,
          instructor,
          semester,
          time,
          campus,
          description,
          capacity,
          enrollment,
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
            query: updateClass.replaceAll("__typename", ""),
            variables: {
              input: {
                id: classRecord.id,
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
      {...getOverrideProps(overrides, "ClassUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              instructor,
              semester,
              time,
              campus,
              description,
              capacity,
              enrollment,
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
        label="Instructor"
        isRequired={true}
        isReadOnly={false}
        value={instructor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              instructor: value,
              semester,
              time,
              campus,
              description,
              capacity,
              enrollment,
            };
            const result = onChange(modelFields);
            value = result?.instructor ?? value;
          }
          if (errors.instructor?.hasError) {
            runValidationTasks("instructor", value);
          }
          setInstructor(value);
        }}
        onBlur={() => runValidationTasks("instructor", instructor)}
        errorMessage={errors.instructor?.errorMessage}
        hasError={errors.instructor?.hasError}
        {...getOverrideProps(overrides, "instructor")}
      ></TextField>
      <TextField
        label="Semester"
        isRequired={true}
        isReadOnly={false}
        value={semester}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              instructor,
              semester: value,
              time,
              campus,
              description,
              capacity,
              enrollment,
            };
            const result = onChange(modelFields);
            value = result?.semester ?? value;
          }
          if (errors.semester?.hasError) {
            runValidationTasks("semester", value);
          }
          setSemester(value);
        }}
        onBlur={() => runValidationTasks("semester", semester)}
        errorMessage={errors.semester?.errorMessage}
        hasError={errors.semester?.hasError}
        {...getOverrideProps(overrides, "semester")}
      ></TextField>
      <TextField
        label="Time"
        isRequired={true}
        isReadOnly={false}
        value={time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              instructor,
              semester,
              time: value,
              campus,
              description,
              capacity,
              enrollment,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Campus"
        isRequired={true}
        isReadOnly={false}
        value={campus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              instructor,
              semester,
              time,
              campus: value,
              description,
              capacity,
              enrollment,
            };
            const result = onChange(modelFields);
            value = result?.campus ?? value;
          }
          if (errors.campus?.hasError) {
            runValidationTasks("campus", value);
          }
          setCampus(value);
        }}
        onBlur={() => runValidationTasks("campus", campus)}
        errorMessage={errors.campus?.errorMessage}
        hasError={errors.campus?.hasError}
        {...getOverrideProps(overrides, "campus")}
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
              title,
              instructor,
              semester,
              time,
              campus,
              description: value,
              capacity,
              enrollment,
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
      <TextField
        label="Capacity"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={capacity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              instructor,
              semester,
              time,
              campus,
              description,
              capacity: value,
              enrollment,
            };
            const result = onChange(modelFields);
            value = result?.capacity ?? value;
          }
          if (errors.capacity?.hasError) {
            runValidationTasks("capacity", value);
          }
          setCapacity(value);
        }}
        onBlur={() => runValidationTasks("capacity", capacity)}
        errorMessage={errors.capacity?.errorMessage}
        hasError={errors.capacity?.hasError}
        {...getOverrideProps(overrides, "capacity")}
      ></TextField>
      <TextField
        label="Enrollment"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={enrollment}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              instructor,
              semester,
              time,
              campus,
              description,
              capacity,
              enrollment: value,
            };
            const result = onChange(modelFields);
            value = result?.enrollment ?? value;
          }
          if (errors.enrollment?.hasError) {
            runValidationTasks("enrollment", value);
          }
          setEnrollment(value);
        }}
        onBlur={() => runValidationTasks("enrollment", enrollment)}
        errorMessage={errors.enrollment?.errorMessage}
        hasError={errors.enrollment?.hasError}
        {...getOverrideProps(overrides, "enrollment")}
      ></TextField>
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
          isDisabled={!(idProp || classModelProp)}
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
              !(idProp || classModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
