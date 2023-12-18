/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
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
      __typename
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
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
      __typename
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
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
      __typename
    }
  }
`;
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass($filter: ModelSubscriptionClassFilterInput) {
    onCreateClass(filter: $filter) {
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
        __typename
      }
      createdAt
      updatedAt
      courseClassesId
      __typename
    }
  }
`;
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass($filter: ModelSubscriptionClassFilterInput) {
    onUpdateClass(filter: $filter) {
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
        __typename
      }
      createdAt
      updatedAt
      courseClassesId
      __typename
    }
  }
`;
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass($filter: ModelSubscriptionClassFilterInput) {
    onDeleteClass(filter: $filter) {
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
        __typename
      }
      createdAt
      updatedAt
      courseClassesId
      __typename
    }
  }
`;
export const onCreateTaken = /* GraphQL */ `
  subscription OnCreateTaken($filter: ModelSubscriptionTakenFilterInput) {
    onCreateTaken(filter: $filter) {
      id
      userId
      courseId
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTaken = /* GraphQL */ `
  subscription OnUpdateTaken($filter: ModelSubscriptionTakenFilterInput) {
    onUpdateTaken(filter: $filter) {
      id
      userId
      courseId
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTaken = /* GraphQL */ `
  subscription OnDeleteTaken($filter: ModelSubscriptionTakenFilterInput) {
    onDeleteTaken(filter: $filter) {
      id
      userId
      courseId
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
