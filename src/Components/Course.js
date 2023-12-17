import React from 'react';
import { listCourses } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { SubjectData } from '../data/Subject';

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

  function getNameForSymbol(symbol) {
    const subject = SubjectData.find(subject => subject.symbol === symbol);
    return subject ? subject.name : "Symbol not found";
  }

  return (
    <div>
      <h1>CVN Courses by Subject</h1>

      <ul>
        {course.map(item =>
          <li key={item.id}>
            <h2>{getNameForSymbol(item.subject)}</h2>

            <div className="Course">
              <h3>
                <span className="Title">{item.subject} {item.number}</span> - {item.title} ({item.point})
              </h3>

              <p>{item.description}</p>
            </div>

            <br/>
          </li>
        )}
      </ul>

    </div>
  )
}

export default Course;