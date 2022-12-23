import fs from 'fs';

const input = fs.readFileSync('./input-0.txt', 'utf8');
// const input = fs.readFileSync('./input-1.txt', 'utf8');

const folderStructure = getFolderStructure(input);
// const maxSize = 100000;
// console.log(getLimitedDirSize(folderStructure, maxSize), 95437)

const dirSizes = getLimitedDirSize(folderStructure);
const totalSpace = 70000000;
const requiredSpace = 30000000;

console.log(getMinimumDeleteSize(dirSizes, totalSpace, requiredSpace), 24933642)

function getMinimumDeleteSize(dir, total, required) {
    const [used, ...sizes] = dir.slice().sort((a,b) => b - a);
    const deleteSize = -1 * (total - used - required);

    if (deleteSize <= 0) {
        return 0;
    }
    return sizes.filter(folder => folder >= deleteSize).sort((a,b) => a - b)[0] || 0;
}

// function getLimitedDirSize(structure, limit) {
function getLimitedDirSize(structure) {
    const folders = Object.entries(structure).reduce((dir, [name, detail]) => {
        if (detail.children !== undefined) {
            return [...dir, name];
        }
        return dir;
    }, []);

    return folders.map((dir) => {
        let childrenDir = [dir];
        let size = 0;
    
        while (childrenDir.length > 0) {
            const item = childrenDir.pop();
            structure[item].children.forEach(name => {
                if (structure[name].size !== undefined) {
                    size += Number(structure[name].size);
                } else {
                    childrenDir.push(name);
                }
            });
        }

        return  size;
    });
    // }).filter((size) => limit === undefined || size <= limit).reduce((total, size) => (total + size), 0);
}

function getFolderStructure(outputs) {
    const structure = {};
    let path = [];

    outputs.split('\n').forEach(line => {
        if (isCd(line)) {
            const dir = line.substring(5);

            switch (dir) {
                case '/':
                    path = ['/'];
                    break;
                case '..':
                    path.pop();
                    break;
                default:
                    path.push(dir);
            }

            const dirPath = path.join('/');
            if (dir !== '..' && structure[dirPath] === undefined) {
                structure[dirPath] = { children: new Set() };
            }
        } else if (!isLs(line)) {
            const dirPath = path.join('/');
            const [detail, child] = line.split(' ');

            if (structure[dirPath] === undefined) {
                structure[dirPath] = { children: new Set() };
            }
            
            const childPath = path.concat(child).join('/');
            structure[dirPath].children.add(childPath);

            if (detail === 'dir' && structure[childPath] === undefined) {
                structure[childPath] = { children: new Set() };
            } else if (detail !== 'dir') {
                structure[childPath] = { size: detail };
            }
        }
    });

    return structure;
}

function isCd(line) {
    return line.substring(0, 4) === '$ cd';
}

function isLs(line) {
    return line.substring(0, 4) === '$ ls';
}