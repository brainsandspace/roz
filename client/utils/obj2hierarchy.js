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

const obj2hierarchy = (obj, parent = null) => {
  if (parent === null) parent = { name: 'root', children: [] };

  parent.children = Object.entries(obj).map(([key, val]) => {

    let returnVal = { name: key, children: val };

    if (typeof val === 'object')  {
      
      if (Object.keys(val).indexOf('size') >= 0) {
        return { name: key, size: val.size };
      } else {
        returnVal = obj2hierarchy(val, returnVal);
      }
    } 
    return returnVal
  });

  const children = [];
  return parent;
}

export default obj2hierarchy;