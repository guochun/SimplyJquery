; (function (global, sJquery) {

    global.$ = sJquery;

})(this, function (nodeOrSelector) {

    let sj = { length: 0 }
   
    function init(nodeOrSelector) {
        if (typeof nodeOrSelector === 'string') {
            let nodes = document.querySelectorAll(nodeOrSelector);
            for (let i = 0; i < nodes.length; i++) {
                sj[i] = nodes[i];
            }
            sj.length = nodes.length

        } else if (nodeOrSelector instanceof Node) {
            sj[0] = sj[0];
            sj.length += 1;
        }
        else {
            sj[0] = nodeOrSelector;
            sj.length += 1;
        }
    }

    function isSameType(obj, matchType) {
        let typeString = Object.prototype.toString.call(obj).slice(8, -1);
        if (typeString === matchType) return true;
        return false;
    }

    function getSiblings(index) {
        index = index || 0;
        index = index % this.length;
        sj = { length: 0 };
        let children = this[index].parentNode.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].isSameNode(this.node)) continue;
            sj[sj.length] = children[i];
            sj.length++;
        }
        return this;
    }

    function addClass(option) {
        let classList;
        for (let i = 0; i < this.length; i++) {
            classList = this[i].classList;
            if (isSameType(option, 'Object')) {
                for (let item in option) {
                    if (typeof option[item] !== "boolean") return;
                    option[item] ? classList.add(item) : classList.remove(item);
                }
            } else if (isSameType(option, 'Array')) {
                option.forEach(function (value) {
                    classList.add(value.toString());
                })
            }
        }
        return this;
    }

    function text() {
        if(arguments.length > 1) {
            let index =arguments[0];
            index = index >>> 0;
            index = index % this.length;
            let value = arguments[1];
            this[index].textContent = value;

        }else{
            console.log(typeof arguments[0])
            if(typeof arguments[0] === 'number'){
                let index = arguments[0]
                index = index >>> 0;
                index = index % this.length;
                return this[index].textContent;
            }else if(typeof arguments[0] === 'string') {
                let value = arguments[0];
                for(let i = 0; i < this.length; i++) {
                    this[i].textContent = value;
                }
                return;
            }
            return this[0].textContent;
        }
        return this;
    }

    function ajax(url, method, data, success, fail) {
        let xhr = new XMLHttpRequest()
        xhr.open(url,method)
        xhr.addEventListener('readystatechange', function(e){
            if(this.readyState === 4 && (this.status >= 200 && this.status < 300)) {
                success(this.responseText)
            }else {
                fail(this)
            }
        })
        xhr.send(data)
    }

    init(nodeOrSelector);
    sj.getSiblings = getSiblings;
    sj.addClass = addClass;
    sj.text = text;
    sj.ajax = ajax;
    return sj;

});


