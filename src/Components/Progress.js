import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useState } from "react";
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import 'react-toastify/dist/ReactToastify.css';
import { SubjectData } from '../data/Subject';
import { Status } from '../data/Status';
import { stringToHash, showError, showSuccess } from '../utils';

const client = generateClient();

const Progress = ({ username }) => {
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleAddTaken = (event) => {
    event.preventDefault();
    addTaken(subject, number, status);
  }

  async function addTaken(subject, number, status) {
    try {
      const courseId = stringToHash(subject + number);

      // Check if course exists
      const course = await client.graphql({
        query: queries.getCourse,
        variables: { id: courseId }
      });

      if (course.data.getCourse == null) {
        showError(`Course ${subject} ${number} does not exist`);
        return;
      }

      // Add course taken to db
      const id = stringToHash(username + courseId);

      const takenDetails = {
        id: id,
        userId: username,
        courseId: courseId,
        status: status
      };

      const newTaken = await client.graphql({
        query: mutations.createTaken,
        variables: { input: takenDetails }
      });

      showSuccess(`Saved course ${subject} ${number} as taken`);
    } catch (error) {
      console.log(error);
      showError(`Failed to save course ${subject} ${number} as taken`);
    }
  }

  return (
    <div>
      <h1>Graduation Progress</h1>

      <form onSubmit={handleAddTaken} className="Form">
        <ul>
          <li>
            <label>Subject</label>
            <span>
              <select defaultValue={""} required onChange={(e) => setSubject(e.target.value)}>
                <option key="default" value="" disabled hidden></option>
                {SubjectData.map((subject) => (
                  <option key={subject.symbol} value={subject.symbol}>{subject.symbol}</option>
                ))}
              </select>
            </span>
          </li>
          <li>
            <label>Number</label>
            <span>
              <input type="number" min="1000" max="9999" required value={number} onChange={(e) => setNumber(e.target.value)} />
            </span>
          </li>
          <li>
            <label>Status</label>
            <span>
              <select defaultValue={""} required onChange={(e) => setStatus(e.target.value)}>
                <option key="default" value="" disabled hidden></option>
                {Status.map((status) => (
                  <option key={status.value} value={status.value}>{status.value}</option>
                ))}
              </select>
            </span>
          </li>
          <li>
            <button type="submit">Add Class</button>
          </li>
        </ul>
      </form>

      <ToastContainer />
    </div>
  )
}

export default Progress;