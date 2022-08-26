import "./assets/styles/style.css";
import "./assets/styles/sprint_style.css";
import App from "./scripts/app";
import { process } from "./scripts/audiocall";

const app = new App();
app.start();
process();
