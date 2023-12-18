/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
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
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
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
export const listClasses = /* GraphQL */ `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        instructor
        semester
        time
        campus
        description
        capacity
        enrollment
        createdAt
        updatedAt
        courseClassesId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTaken = /* GraphQL */ `
  query GetTaken($id: ID!) {
    getTaken(id: $id) {
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
export const listTakens = /* GraphQL */ `
  query ListTakens(
    $filter: ModelTakenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTakens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        courseId
        status
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
