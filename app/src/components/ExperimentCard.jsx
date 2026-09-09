import { Link } from "react-router-dom";

export default function ExperimentCard({ title, description, link }) {
    const isExternal = link.startsWith("http");

    return (
        <div className="card">
            <h2>{title}</h2>

            <p>{description}</p>

            {isExternal ? (
                <a href={link} className="btn" target="_blank" rel="noreferrer">
                    Open Output
                </a>
            ) : (
                <Link to={link} className="btn">
                    Open Experiment
                </Link>
            )}
        </div>
    );
}
