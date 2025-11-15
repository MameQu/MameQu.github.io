function addCSSContainer() {
    const container = document.querySelector("div.overlay-wrap");
    const z = updateCSS();

    const f1 = addDiv(container, "f1");
    const f1a1 = addTextarea(f1, "a1");
    f1a1.value = z.textContent;
    const f1a2 = addButton(f1, "a2");
    f1a2.textContent = 'Change';
    f1a2.onclick = function () {
        z.innerText = f1a1.value;
    }
}

function updateCSS(style) {
    const styleTag = document.querySelector("style.style");
    const random = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    if (style) {
        const selector = `.${style}`;
        if (!styleTag.textContent.includes(selector)) {
            styleTag.textContent += `
    ${selector} {
      pointer-events: auto;
      position:absolute;
      height:100px;
      width:100px;
      background:${random};
    }
    `;
        }
    }
    return styleTag;
}

function addDiv(parentDiv, style) {
    const div = document.createElement("div");
    div.classList.add(style);
    updateCSS(style);
    parentDiv.appendChild(div);
    return div;
}

function test(elementGet) {
    return new Promise((resolve, reject) => {
        const tries = 30;
        const interval = 200;
        let attempts = 0;

        const retry = setInterval(() => {
            const elements = elementGet();

            if (elements) {
                clearInterval(retry);
                resolve(elements.length ? elements : [elements]);
            }

            if (++attempts >= tries) {
                clearInterval(retry);
                reject(new Error("Element(s) not found after max retries."));
            }
        }, interval);
    });
}

function check(element) {
    return new Promise((resolve, reject) => {
        const tries = 15;
        let attempts = 0;
        const int = setInterval(() => {
            if (element()) {
                clearInterval(int);
                resolve();
            }
            if (++attempts >= tries) {
                clearInterval(int);
                reject(new Error("Max attempts reached"));
            }
        }, 2500);
    });
}

function addAudio(parentDiv, style) {
    const audio = document.createElement("audio");
    audio.classList.add(style);
    updateCSS(style);
    parentDiv.appendChild(audio);
    return audio;
}

function adda(parentDiv, style) {
    const a = document.createElement("a");
    a.classList.add(style);
    updateCSS(style);
    parentDiv.appendChild(a);
    return a;
}

function addSpan(parentDiv, style) {
    const span = document.createElement("span");
    span.classList.add(style);
    updateCSS(style);
    parentDiv.appendChild(span);
    return span;
}

function loadCSS() {
    const style = document.createElement("style");
    style.classList.add('style');
    style.textContent = `
    textarea {
        overflow-y: auto;
      }

          .overlay-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              pointer-events: none;
              background: rgba(0, 0, 0, 0);
              z-index: 9999;
          }
          .overlay-wrap > * {
              pointer-events: auto;
          }

          .overlay-wrap {
              pointer-events: none;
              position: relative;
              width:100%;
              height:100%;
          }
              .f1 {
      pointer-events: auto;
      position: absolute;
      height: 500px;
      display: flex;
      right: 20px;
      width: 400px;
      top: 20px;
      flex-direction: column;
      }
      .a1 {
      pointer-events: auto;
      display: flex;
      position: relative;
      flex-grow: 1;
      background: rgba(0, 0, 0, 0.1);
      }
      .a2 {
      pointer-events: auto;
      position: relative;
      height: 20px;
      display: flex;
      background: rgba(0, 0, 0, 0.3);
      }
    `;
    document.head.appendChild(style);
    return style.textContent;
}

function addOverlayContainer() {
    const container = document.createElement("div");
    const border = document.createElement("div");
    container.classList.add("overlay-container");
    border.classList.add("overlay-wrap");
    container.append(border);
    document.body.append(container);

    return border
}

function addButton(parentDiv, style) {
    const button = document.createElement("button");
    button.classList.add(style);
    parentDiv.appendChild(button);
    updateCSS(style);
    return button
}

function addTextarea(parentDiv, style) {
    const textarea = document.createElement("textarea");
    textarea.classList.add(style);
    parentDiv.appendChild(textarea);
    updateCSS(style);
    return textarea
}

function store(key, value) {
    let saveKey = `data_${window.location.pathname}`, storedData = localStorage.getItem(saveKey);

    if (storedData) {
        storedData = JSON.parse(storedData);
    } else {
        storedData = {};
    }

    storedData[key] = value;
    localStorage.setItem(saveKey, JSON.stringify(storedData));
}

function loadData() {
    let saveKey = `data_${window.location.pathname}`, storedData = localStorage.getItem(saveKey);

    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return {}
    }
}

function stores(key, value) {
    let saveKey = `data_`, storedData = localStorage.getItem(saveKey);

    if (storedData) {
        storedData = JSON.parse(storedData);
    } else {
        storedData = {};
    }

    storedData[key] = value;
    localStorage.setItem(saveKey, JSON.stringify(storedData));
}

function loadDatas() {
    let saveKey = `data_`, storedData = localStorage.getItem(saveKey);

    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return {}
    }
}


function changeCSS(css, value) {
    const elements = document.querySelectorAll(css);
    const cssProps = value.split(';').filter(Boolean);

    elements.forEach(el => {
        cssProps.forEach(prop => {
            const [key, value] = prop.split(':').map(str => str.trim());
            if (key && value) {
                el.style[key] = value;
            }
        });
    });
}

let i = 0;
document.addEventListener("mousedown", (event) => {
    if (event.button === 1) {
        event.preventDefault();
        if (document.querySelector('div.overlay-container')) {
            if (i === 0) {
                document.querySelector('div.overlay-container').style.display = 'none';
                i = 1;
            } else {
                document.querySelector('div.overlay-container').style.display = 'block';
                i = 0
            }
        }
    }
});

function monitorPageChange(callback) {
    let lastUrl = location.href;

    function handleChange() {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            callback(lastUrl);
        }
    }

    window.addEventListener("popstate", handleChange);

    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function (...args) {
        pushState.apply(history, args);
        handleChange();
    };

    history.replaceState = function (...args) {
        replaceState.apply(history, args);
        handleChange();
    };
}

monitorPageChange(() => {
    if (document.querySelector("div.overlay-container")) {
        document.querySelector("div.overlay-container").remove();
    }
    if (window.location.pathname.startsWith("/anime/")) {
        overlayContents();
    }
});