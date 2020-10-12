import fastglob from 'fast-glob';
import fs from 'fs-extra';
import insertLine from 'insert-line';
/**
 * Adds "version": "0.0.0" to package.json files that don't already have a version
 */

async function run() {
    // get the modules
    const files = await fastglob([
      '*/**/package.json',
      '!**/node_modules/**',
      '!**/bower_components/**',
    ]);
    const modules = files.filter(file => file.includes('package.json'));
    modules.map(async currentModule => {
      let json = await fs.readFile(currentModule);
      try {
        json = JSON.parse(json);
        if (!Object.keys(json).includes('version')) {
            // update the file
            console.log(`Adding version to ${currentModule}`);
            await insertLine(currentModule).content('"version": "0.0.0",', {
              padding: 2
            }).at(3);
        }
      } catch (e) {
        console.log(`Failed at ${currentModule}`);
        console.log(e);
      }
    });
  }
  
  run();