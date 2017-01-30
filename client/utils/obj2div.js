/** Takes in an object and returns it as a DOM Tree */

const obj2div = (obj, parentEl = null) => {
    
    if (!parentEl) {
        parentEl = document.createElement('div');
    }

    console.log('entries',Object.entries(obj))
    const divArr = Object.entries(obj).map(([key, val]) => {
        console.log(key, val);
        const el = document.createElement('div');
        el.id = key;
        el.innerHTML = key;
        el.className = parentEl.id;

        if (parentEl) { parentEl.appendChild(el); }

        if (typeof val === 'object') {
          return obj2div(val, el)
        } else {
            el.innerHTML += val;
        }

        return el;
    });

    return parentEl;

}

export default obj2div;