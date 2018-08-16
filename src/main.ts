import { CollectionsGenerator } from './generate-map-contexts';
var fs = require('fs');

function generate() {
    let generator = new CollectionsGenerator;
    return generator.generateNZmapcontexts();
}

let mydata = generate();

mydata.forEach((owc, idx) => {
    // console.log(JSON.stringify(owc));

    fs.writeFile(`sac_${idx}_contexts.json`, JSON.stringify(owc), 'utf8', function(err) {
        if (err) throw err;
        console.log(`sac_${idx}_contexts.json complete`);
        }
    );
});
