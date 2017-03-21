/** Takes in an object and returns it as a DOM Tree of whatever type of element you want */

const obj2dom = (obj, namespace = 'html', nodeType = 'div', parentEl = null, depth = 0) => {
    let ns = 'http://www.w3.org/1999/xhtml';
    if (namespace !== 'html') {
        ns = 'http://www.w3.org/2000/svg'
    }
    if (!parentEl) {
        parentEl = document.createElementNS(ns, nodeType);
    }

    Object.entries(obj).map(([key, val]) => {
        const el = document.createElementNS(ns, nodeType);
        el.id = key;
        // el.innerHTML = key;
        el.setAttribute('class', `${parentEl.id} depth-${depth}`);

        if (parentEl) { parentEl.appendChild(el); }

        if (typeof val === 'object') {
            // recurse if the value is an object
          return obj2dom(val, namespace, nodeType, el, depth + 1);
        } else {
            el.innerHTML += val;
        }

        return el;
    });

    return parentEl;

}

export default obj2dom;