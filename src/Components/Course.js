import React from 'react';
import { listCourses } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { SubjectData } from '../data/Subject';

const client = generateClient();

const Course = () => {
  const [course, setCourse] = useState([]);

  function compare(a, b) {
    if (a.subject < b.subject) {
      return -1;
    }
    if (a.subject > b.subject) {
      return 1;
    }
    return 0;
  }

  async function fetchCourse() {
    const { data } = await client.graphql({
      query: listCourses
    });

    data.listCourses.items.sort(compare)
    setCourse(data.listCourses.items)
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  function getNameForSymbol(symbol) {
    const subject = SubjectData.find(subject => subject.symbol === symbol);
    return subject ? subject.name : "Others";
  }

  return (
    <div>
      <h1>CVN Courses by Subject</h1>

      <ul>
        {course.map((item, index) =>
          <li key={item.id}>

            {/* Display subject only if previous course is a different subject */}
            {index === 0 || item.subject !== course[index - 1].subject ? (
              <h2>{getNameForSymbol(item.subject)}</h2>
            ) : null}

            <div className="Course">
              <h3>
                <span className="Title">{item.subject} {item.number}</span> - {item.title} ({item.point})
              </h3>

              <p>{item.description}</p>
            </div>

            <br />
          </li>
        )}
      </ul>

    </div>
  )
}

export default Course;