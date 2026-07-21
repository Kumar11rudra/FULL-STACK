import "../../styles/exp111.css";
import PostComposer from "../../components/exp111/PostComposer";

export default function Exp111() {
    return (
        <div className="app">
            <header className="header">
                <h1>Dynamic Social Media Post Composer</h1>
                <p>Experiment 1.1.1 - Multi Platform Post Composer</p>
            </header>

            <PostComposer />
        </div>
    );
}