import nodePandoc from 'node-pandoc'
import Logger from './logger.js'

// Pandoc docs
// https://pandoc.org/MANUAL.html#options
export default class PandocCompiler {

    #replaceWithMarkdownExtension(filePath) {
        // Split the file path into directory and base name
        const directory = filePath.substring(0, filePath.lastIndexOf('/'));
        const baseName = filePath.substring(filePath.lastIndexOf('/') + 1);
    
        // Remove the existing extension (if any)
        const baseNameWithoutExtension = baseName.replace(/\.[^/.]+$/, '');
    
        // Add the new extension ".md"
        const newFilePath = `${directory}/${baseNameWithoutExtension}.md`;
        return newFilePath;
    }

    compileToMarkdown(filePath){

        const fileExtension = filePath.split(".").slice(-1)
        const fileOutputPath = this.#replaceWithMarkdownExtension(filePath);

        console.log("-----------fileOutputPath", fileOutputPath)

        function callback(err, result){
            if (err) {
                Logger.log((typography) => `
                Cannot compile to markdown the file ${typography.bold(filePath)} because of the following error: ${err} 
                `, Logger.ErrorLevel);
            }
            return null, result
        }

        // pandoc convert.rst -f rst -t markdown -s -o convert.md  
        nodePandoc(filePath, ['-f', fileExtension, '-t', 'markdown', "-s", "-o", fileOutputPath], callback)

        return fileOutputPath
    }
}
