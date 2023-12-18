/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      subject
      number
      point
      title
      description
      is_required
      is_breath
      is_elective
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      subject
      number
      point
      title
      description
      is_required
      is_breath
      is_elective
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      subject
      number
      point
      title
      description
      is_required
      is_breath
      is_elective
      classes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
      id
      title
      instructor
      semester
      time
      campus
      description
      capacity
      enrollment
      course {
        id
        subject
        number
        point
        title
        description
        is_required
        is_breath
        is_elective
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      courseClassesId
      owner
      __typename
    }
  }
`;
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
      id
      title
      instructor
      semester
      time
      campus
      description
      capacity
      enrollment
      course {
        id
        subject
        number
        point
        title
        description
        is_required
        is_breath
        is_elective
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      courseClassesId
      owner
      __typename
    }
  }
`;
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
      id
      title
      instructor
      semester
      time
      campus
      description
      capacity
      enrollment
      course {
        id
        subject
        number
        point
        title
        description
        is_required
        is_breath
        is_elective
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      courseClassesId
      owner
      __typename
    }
  }
`;
export const createTaken = /* GraphQL */ `
  mutation CreateTaken(
    $input: CreateTakenInput!
    $condition: ModelTakenConditionInput
  ) {
    createTaken(input: $input, condition: $condition) {
      id
      userId
      courseId
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateTaken = /* GraphQL */ `
  mutation UpdateTaken(
    $input: UpdateTakenInput!
    $condition: ModelTakenConditionInput
  ) {
    updateTaken(input: $input, condition: $condition) {
      id
      userId
      courseId
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteTaken = /* GraphQL */ `
  mutation DeleteTaken(
    $input: DeleteTakenInput!
    $condition: ModelTakenConditionInput
  ) {
    deleteTaken(input: $input, condition: $condition) {
      id
      userId
      courseId
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
