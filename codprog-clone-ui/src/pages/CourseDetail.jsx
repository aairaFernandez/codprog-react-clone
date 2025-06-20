import React from "react";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export async function courseDetailLoader({ params }) {
  const { id: courseID } = params;
  const URL = `${BASE_URL}rest/v1/modules?course_id=eq.${courseID}&select=*`;
  const { data: modules } = await axios.get(URL, {
    headers: {
      apikey: SUPABASE_API_KEY,
    },
  });
  return { modules, courseID };
}

function CourseDetail() {
  const { modules, courseID } = useLoaderData();
  return (
    <div>
      <p>{JSON.stringify(modules)}</p>
      <br />
      <button>Buy Now</button>
    </div>
  );
}

export default CourseDetail;
