/**
 * The object this function receives looks like
 * root: {
 *  child: {
 *    grandchild: { size: 10 }   
 *  },
 *  ...
 *  child: {
 *    grandchild: { size: 10 }   
 *  }
 * }
 * 
 * 
 * This function transforms that object to one that looks like this, to be used in d3
 * {
 *  name: 'root',
 *  children: [
 *    {
 *      name: 'child'
 *      children: [
 *        {
 *          name: 'grandchild',
 *          size: 10
 *        }
 *      ]
 *    },
 *    ...
 *    {
 *      name: 'child'
 *      children: [
 *        {
 *          name: 'grandchild',
 *          size: 10
 *        }
 *      ]
 *    }
 * ]
 * 
 * }
 */

const obj2hierarchy = (obj, parent = null, options = {
  diminishMedia: false,
  diminishBundle: false, 
  diminishMin: false, 
  diminishJSON: true, 
  diminishDS_Store: true,
}) => {
  if (parent === null) parent = { name: 'root', children: [] };
  console.log('obj', obj)
  parent.children = Object.entries(obj).map(([key, val]) => {

    let returnVal = { name: key, children: val };

    if (typeof val === 'object')  {
      
      if (Object.keys(val).indexOf('size') >= 0) {
        
        // hide the size of the media files if that option is set        
        if (options.diminishMedia && key.match(/\.png|\.jpg|\.svg|\.ico|\.mp4|\.webm|\.ogv/i)) val.size = 1;

        // hide the size of the json files if that option is set        
        if (options.diminishJSON && key.match(/\.json/i)) val.size = 1;

        // hide the size of bundled files if that option is set
        if (options.diminishBundle && key.match(/.*bundle\.js/)) val.size = 1;

        // hide the size of minified files if that option is set
        if (options.diminishBundle && key.match(/.*\.min\..*/)) val.size = 1;

        if (options.diminishDS_Store && key.match(/\.ds_store/i)) val.size = 1;

        return { name: key, size: val.size };
      } else {
        returnVal = obj2hierarchy(val, returnVal, options);
      }
    } 
    return returnVal;
  });

  const children = [];
  return parent;
}

export default obj2hierarchy;