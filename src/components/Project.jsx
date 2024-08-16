import { useNavigate } from "react-router-dom";

export default function Project({ project }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/projects/${project.id}`);
  }

  return (
    <article className="card" onClick={handleClick}>
      <img src={project.image || "https://placehold.co/600x400?text=Error+loading+image"} alt={project.name} />
      <h2>{project.name}</h2>
      <p className="title">{project.subtitle}</p>
    </article>
  );
}
