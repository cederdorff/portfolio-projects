import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const [project, setProject] = useState({}); // state to handle the data (project)
  const { id } = useParams();

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("https://raw.githubusercontent.com/cederdorff/cederdorff.github.io/main/public/data/clients.json"); // fetch the data from the API
      const data = await response.json(); // parse the data from string to javascript array
      console.log(data);

      const project = data.find(project => project.id === id); // find the project with the id from the params
      setProject(project); // set the projects state with the data from the API
    }

    fetchProjects(); // call the function to fetch the data
  }, [id]); // <--- "[id]" VERY IMPORTANT!!!

  return (
    <section className="page">
      <div className="project-grid">
        <img src={project?.image || "https://placehold.co/600x400?text=Error+loading+image"} alt={project?.name} />
        <section>
          <h1>{project.name}</h1>
          <h2>{project.subtitle}</h2>
          <p>{project.body}</p>
          <ul>
            {project?.links?.map((link, index) => (
              <li key={`${link.id}-${index}`}>
                <a href={link.url} rel="noreferrer" target="_blank">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
