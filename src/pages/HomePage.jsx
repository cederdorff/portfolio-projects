import { useEffect, useState } from "react";
import Project from "../components/Project";

export default function HomePage() {
  const [projects, setProjects] = useState([]); // state to handle the data (projects)
  const [searchTerm, setSearchTerm] = useState(""); // state to handle the search term
  const [filter, setFilter] = useState(""); // state to handle the filter
  const [sortBy, setSortBy] = useState("name"); // state to handle the sort

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("https://raw.githubusercontent.com/cederdorff/cederdorff.github.io/main/public/data/clients.json"); // fetch the data from the API
      const data = await response.json(); // parse the data from string to javascript array
      console.log(data);

      setProjects(data); // set the projects state with the data from the API
    }

    fetchProjects(); // call the function to fetch the data
  }, []);

  // Search, filter and sort the projects array
  let filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const titles = [...new Set(projects.map(project => project.subtitle))]; // get all the unique titles from the projects array

  if (filter != "") {
    filteredProjects = filteredProjects.filter(project => project.subtitle === filter); // filter the projects array by the selected title
  }

  filteredProjects.sort((project1, project2) => project1[sortBy].localeCompare(project2[sortBy])); // sort the projects array by the selected sort

  return (
    <section className="page">
      <form className="grid-filter" role="search">
        <label>
          Serach by Project Name <input placeholder="Search" type="search" onChange={e => setSearchTerm(e.target.value)} />
        </label>
        <label>
          Filter by Type
          <select onChange={e => setFilter(e.target.value)}>
            <option value="">select title</option>
            {titles.map(title => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="subtitle">Type</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredProjects.map(project => (
          <Project project={project} key={project.id} />
        ))}
      </section>
    </section>
  );
}
