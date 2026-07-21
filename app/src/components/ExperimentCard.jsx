import { Link } from "react-router-dom";

export default function ExperimentCard({ title, description, link }) {
    return (
        <div className="card">
            <h2>{title}</h2>

            <p>{description}</p>

            <Link to={link} className="btn">
                Open Experiment
            </Link>
        </div>
    );
}