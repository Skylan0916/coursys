import './App.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import { listClasses, listCourses } from './graphql/queries';
import { useEffect, useState } from 'react';

Amplify.configure(config);
const client = generateClient();

function App({ signOut, user }) {
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
    <>
      <h1>Hello {user.username}</h1>
      <ul>
        {course.map(item =>
          <li key={ item.id }>{item.title}</li>)
        }
      </ul>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
