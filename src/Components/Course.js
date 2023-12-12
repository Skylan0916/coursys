import React from 'react';
import { listClasses, listCourses } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const Course = () => {

  const [course, setCourse] = useState([]);

  async function fetchCourse() {
    const { data } = await client.graphql({
      query: listCourses
    });
    setCourse(data.listCourses.items)
    console.log(data);
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div>
      <h1>Courses</h1>

      <ul>
        {course.map(item =>
          <li key={item.id}>{item.title}</li>)
        }
      </ul>

    </div>
  )
}

export default Course;