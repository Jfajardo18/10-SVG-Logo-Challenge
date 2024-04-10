//packages
import fs from 'fs';
import inquirer from 'inquirer';
//import generateSvg from 'utils/generateSvg';
// const generateSvg = require('./utils/generateSvg');
import { Circle, Triangle, Square} from './lib/shape.js';
import SVG from './lib/svg.js';

//array of questions

const questions = [
    {
        type: "input",
        message: "Input letters to display on logo. No more than 3 characters.",
        name: "text",
    },
    {
        type: "input",
        message: "Enter the text color for the logo. Color name or hexadecimal is fine.",
        name: "textColor",
    },
    {
        type: "list",
        message: "Pick a shape for your logo.",
        name: "shape",
        choices: ["circle","square","triangle"],
    },
    {
        type: "input",
        message: "Enter the color you want for the shape. Color name or hexadecimal is fine.",
        name: "shapeColor",
    },
]

//SVG creation function

// const createSvg = (fileName, data) => {
//     const template = generateSvg(data);
//     fs.writeFile(fileName, template, (err) => {
//         err ? console.error(err) : console.log("Generated logo.svg");
//     });
// }

//funtion to initialize app
const generateLogo = () => {
    inquirer.prompt(questions).then((data) => {
        //createSvg("./output/logo.svg", data);
        let shape;

        switch(data.shape) {
            case "circle":
                shape = new Circle();
                break;
        }
        switch(data.shape) {
            case "triangle":
                shape = new Triangle();
                break;
        }
        switch(data.shape) {
            case "square":
                shape = new Square();
                break;
        }

        shape.setColor(data.shapeColor);

        const svg = new SVG();
        svg.setText(data.text, data.textColor);
        svg.setShape(shape);
        return fs.writeFile('logo.svg', svg.render(), (err) => {
            if (err) {
                console.error('Failed to write the file:', err);
            } else {
                console.log('Generated logo.svg');
            }
        });
    });
};

//call function
generateLogo ();