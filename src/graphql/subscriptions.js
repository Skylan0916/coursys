/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onCreateCourse(filter: $filter, owner: $owner) {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onUpdateCourse(filter: $filter, owner: $owner) {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse(
    $filter: ModelSubscriptionCourseFilterInput
    $owner: String
  ) {
    onDeleteCourse(filter: $filter, owner: $owner) {
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
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onCreateClass(filter: $filter, owner: $owner) {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onUpdateClass(filter: $filter, owner: $owner) {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass(
    $filter: ModelSubscriptionClassFilterInput
    $owner: String
  ) {
    onDeleteClass(filter: $filter, owner: $owner) {
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
export const onCreateTaken = /* GraphQL */ `
  subscription OnCreateTaken(
    $filter: ModelSubscriptionTakenFilterInput
    $owner: String
  ) {
    onCreateTaken(filter: $filter, owner: $owner) {
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
export const onUpdateTaken = /* GraphQL */ `
  subscription OnUpdateTaken(
    $filter: ModelSubscriptionTakenFilterInput
    $owner: String
  ) {
    onUpdateTaken(filter: $filter, owner: $owner) {
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
export const onDeleteTaken = /* GraphQL */ `
  subscription OnDeleteTaken(
    $filter: ModelSubscriptionTakenFilterInput
    $owner: String
  ) {
    onDeleteTaken(filter: $filter, owner: $owner) {
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
