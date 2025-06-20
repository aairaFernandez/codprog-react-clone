import axios from "axios";
import React from "react";
import { GET_ALL_COURSES, SUPABASE_API_KEY } from "../constants";
import { Link, useLoaderData } from "react-router-dom";

export async function homeLoader() {
  const response = await axios.get(GET_ALL_COURSES, {
    headers: {
      apikey: SUPABASE_API_KEY,
    },
  });
  // console.log("GET ALL COURSES RESPONSE : ", response);
  return response.data;
}

function Home() {
  const courses = useLoaderData();
  console.log("courses : ", courses);
  return (
    <div>
      <h2>My Courses</h2>
      {courses.map((course) => {
        const { id, name, amount, currency, description } = course;
        return (
          <div key={id}>
            <p>
              {" "}
              Course Id : <span>{id}</span>
            </p>
            <p>
              Name : <span>{name}</span>
            </p>
            <p>
              Price :{" "}
              <span>
                {amount} {currency}
              </span>
            </p>
            <p>
              {" "}
              Description : <span>{description}</span>
            </p>

            <Link to={`/course-details/${id}`}>View course</Link>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
