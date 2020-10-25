const tags = [
    'p',
    'div',
    'span',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'strong',
    'em',
    'blockquote',
    'li',
    'td',
    'dt',
    'dd',
];
const timeRegex = /((1[0-2]|0?[1-9])(:|h)([0-5][0-9]) ?([AaPp][Mm]))/;

const onMutation = (mutations) => {
    for (let i = 0, len = mutations.length; i < len; i++) {
        const added = mutations[i].addedNodes;
        for (let j = 0, node; (node = added[j]); j++) {
            if (tags.includes(node.localName)) {
                if (timeRegex.test(node.textContent)) {
                    replaceText(node);
                }
            } else if (node.firstElementChild) {
                for (const el of node.querySelectorAll(tags.join(', '))) {
                    if (timeRegex.test(el.textContent)) {
                        replaceText(node);
                    }
                }
            }
        }
    }
};

const replaceText = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode()); ) {
        const text = node.nodeValue;
        console.log(text);
        const newText = text.replace(timeRegex, (time) => formatTime(time));
        if (text != newText) {
            node.nodeValue = newText;
        }
    }
};

const formatTime = (time) => {
    console.log(time);
    const phase = time.substring(time.length - 2, time.length).toUpperCase();
    const hSeperator = time.includes('h');
    time = time.replace(/[AaPp][mM]/, '');
    const hmArray = time.split(/:|h/).map((str) => Number(str));
    const military = hmArray[0] + (phase === 'PM' && hmArray[0] < 12 ? 12 : 0);
    return `${military < 10 ? '0' + military : military}${hSeperator ? 'h' : ':'}${
        hmArray[1] < 10 ? '0' + hmArray[1] : hmArray[1]
    }`;
};

let observer = new MutationObserver(onMutation);
observer.observe(document, {
    childList: true,
    subtree: true,
});

document.querySelectorAll(tags.join(', ')).forEach((node) => {
    if (timeRegex.test(node.textContent)) {
        replaceText(node);
    }
});
