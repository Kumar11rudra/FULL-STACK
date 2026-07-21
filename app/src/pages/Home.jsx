import ExperimentCard from "../components/ExperimentCard";

export default function Home() {
    return (
        <div className="container">

            <h1>Full Stack Laboratory</h1>

            <p className="subtitle">
                Select an experiment to continue.
            </p>

            <div className="grid">

                <ExperimentCard
                    title="Experiment 1.1"
                    description="React Basics"
                    link="/exp11"
                />

                <ExperimentCard
                    title="Experiment 1.2"
                    description="React Components"
                    link="/exp12"
                />

                <ExperimentCard
                    title="Experiment 1.3"
                    description="Forms & State"
                    link="/exp13"
                />

                <ExperimentCard
                    title="Experiment 1.4"
                    description="Advanced React"
                    link="/exp14"
                />

            </div>

        </div>
    );
}