const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');


const markdownDir = path.join(__dirname, 'markdown');
const outputFilePath = path.join(__dirname, 'data', 'content.json');

if (!fs.existsSync(path.dirname(outputFilePath))) {
    fs.mkdirSync(path.dirname(outputFilePath));
}


const allData = [];

try {

    const files = fs.readdirSync(markdownDir).filter(file => file.endsWith('.md'));

    files.forEach(file => {
        const filePath = path.join(markdownDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');

   
        const { data, content } = matter(fileContent);


        allData.push({
            id: path.basename(file, '.md'), 
            ...data, 
            content 
        });
    });

    const jsonOutput = JSON.stringify(allData, null, 2);

    fs.writeFileSync(outputFilePath, jsonOutput, 'utf8');

    console.log(`Successfully converted ${files.length} markdown files to JSON.`);
    console.log(`JSON file saved to: ${outputFilePath}`);

} catch (err) {
    console.error('An error occurred:', err);
}