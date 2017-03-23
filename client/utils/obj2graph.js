/**
 * The object this function receives looks like
 * {
 *  [child]: {
 *    [grandchild]: { size: 10 }   
 *  },
 *  ...
 *  [child]: {
 *    [grandchild]: { size: 10 }   
 *  }
 * }
 * 
 * 
 * This function transforms that object to one that looks like this, to be used in d3
 * {
 *  nodes: [
 *     {
 *       name: 'something.txt'
 *     },
 *   ...
 *   ],
 *   links: [
 *    {
 *       source: 'something.txt',
 *       target: 'something-else.txt',
 *     }
 *       ...
 *   ]
 * }
 *
 */
const FOLDER_SIZE = 1000;

// THIS IS BAD PRACTICE
const nodes = [];
const links = [];

const fileTypes = new Set().add('folder');
console.log('fileTypes', fileTypes);

const obj2graph = obj => {
  nodes.push({ id: 'root', size: FOLDER_SIZE });
  extractNodes('root', obj);

  return [
    fileTypes,
    {
      nodes,
      links,
    },
  ];
};

function extractNodes(parent, obj) {
  Object.entries(obj).forEach(([key, val]) => {
    if (val.size) {
      // the only file I can think of without a file type is LICENSE, so we will make LICENSE its file type
      const fileType = key.match(/\.(.*$)/) ? key.match(/\.(.*$)/)[1] : key;
      fileTypes.add(fileType);
      nodes.push({
        id: `${parent}/${key}`,
        size: val.size,
        fileType,
        incoming: 0,
      });
      links.push({
        source: parent,
        target: `${parent}/${key}`,
        linkType: 'filesystem',
      });
    } else {
      nodes.push({
        id: `${parent}/${key}`,
        size: FOLDER_SIZE,
        fileType: 'folder',
      });
      links.push({
        source: parent,
        target: `${parent}/${key}`,
        linkType: 'filesystem',
      });
      extractNodes(`${parent}/${key}`, val);
    }
  });
}

export default obj2graph;



