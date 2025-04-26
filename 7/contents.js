function overlayContents() {
    const data = loadData();
    loadCSS();
    const z = updateCSS();
    const container = addOverlayContainer();
    const divs = addDiv(container, "divs");
    const div1 = addDiv(divs, "div1");
    const chord = addDiv(div1, "chord");
    const div2 = addDiv(divs, "div2");
    const div2a = addDiv(div2, "div2a");
    const div2b = addDiv(div2, "div2b");
    const div2ba = addSpan(div2b, "div2ba");
    const div2bb = addSpan(div2b, "div2bb");
    const div2bc = addDiv(div2b, "div2bc");
    const div2bca = addSpan(div2bc, "div2bca");
    const div2bcb = addSpan(div2bc, "div2bca");
    const div3 = addDiv(divs, "div3");
    const bar = addDiv(div3, "bar");
    const matching = addDiv(container, "matching");
    const profile1 = addDiv(container, "profile1");
    const profile1a = addDiv(profile1, "p1a");
    const profile1b = addDiv(profile1, "p1b");
    const skillset = addDiv(profile1b, 'set');
    const profile2 = addDiv(container, "profile2");
    const profile2a = addDiv(profile2, "p2a");
    const profile2b = addDiv(profile2, "p2b");
    const quest = addDiv(profile2b, "quest")
    const alert = addDiv(container, "alert");
    const chat = addDiv(profile2, "chat");
    alert.textContent = "Invasion commences . . .";
    matching.textContent = 'allow invasions';
    div2bca.textContent = 'Lv ';
    profile1a.textContent = 'Status Card';
    profile2a.textContent = 'Subjugations';
    const input = addDiv(chat, "input");
    const link = addTextarea(input, "link");
    const submity = addButton(input, "submity");
    if(!data.e === '') {
        const s = data.e;
        input.innerHTML = `<iframe src='https://www.youtube.com/live_chat?v=${s}&embed_domain=mamequ.github.io' style='height:100%;width:100%'></iframe>`;
    };
    submity.onclick = function() {
        const s = link.value.match(/[?&]v=([^&]+)/)[1];
        store('e',s);
        input.innerHTML = `<iframe src='https://www.youtube.com/live_chat?v=${s}&embed_domain=mamequ.github.io' style='height:100%;width:100%'></iframe>`;
    }

    let exp,exps;
    //store('a', 5540);
    //store('b', [84,61,41,0]);
    if (data.a) {
        exp = data.a;
        const lv = level(exp);
        div2bcb.textContent = `${lv[0]} (${lv[1]}/${lv[2]})`;
    } else {
        exp = 0;
        const lv = level(exp);
        div2bcb.textContent = `${lv[0]} (${lv[1]}/${lv[2]})`;
    }

    if (data.b) {
        exps = data.b;
    } else {
        exps = [0,0,0,0];
        data.b = exps;
    }

    console.log(exps);
    for (let i = 0;i < links.length; i++) {
    const button = addButton(div2a, "buttons");
    button.textContent = names[i];
    button.onclick = function() {
        const audio = new Audio(links[i]);
        audio.play();
        chord.textContent = names[i];
    }
    }
    store('d','')
    const today = new Date().toISOString().split('T')[0];
    const newdate = data.d;
    if(newdate !== today) {
        const s = range(2,5);
        for (let i = 0;i < s; i++) {
            const c = randomize(category);
            const t = range(1,5);
            const list = addDiv(quest, 'list');
            const sname = addDiv(list, "lname");
            sname.textContent = category[c];
            const stier = addDiv(list, "ltier");
            for(let i = 0;i < t; i++) {
                stier.textContent += ` A`;
                list.id = i + 1;
                if (c === 3) {
                    stier.textContent = `Boss`;
                    list.id = 1;
                }
            }
        }
        store('d',today);
        store('c', quest.innerHTML);
    }

    if(data.c) {
        quest.innerHTML = data.c;
    }

    function updateTier() {
        skillset.innerHTML = '';
        for (let i = 0;i < 4; i++) {
            if (i === 3) {
            const skill = addDiv(profile1, 'skillS');
            const stier = addDiv(skill, "stierS");
            const t = tiers(exps[i]);
            stier.textContent = t[0];
            skill.style.background = gradient[t[3]];
            const tree = addDiv(stier, "treeS");
            tree.textContent = `${t[2] - t[1]} left`;
            } else {
                const skill = addDiv(skillset, 'skill');
                const sname = addDiv(skill, "sname");
                const stier = addDiv(skill, "stier");
                sname.textContent = category[i];
                const t = tiers(exps[i]);
                stier.textContent = t[0];
                skill.style.background = gradient[t[3]];
                const tree = addDiv(stier, "tree");
                tree.textContent = `${t[1]} / ${t[2]}`;
            }
        }
    }

    let g, v = 0,s = 0;
    quest.onclick = ((e) => {
        if(e.target.className === 'list' && v === 0) {
            if (!isPaused) {
                pause();
            }
            pauselock = 1;
            v = 1;
            e.target.remove();
            s = parseInt(e.target.id);
            g = e.target.querySelector('div.lname').innerText;
            alert.textContent = `Attacking (${s}) . . .`;
            finish(500);
            store('c', quest.innerHTML);
        }
    })

    updateTier();
    function match(type = 0) {
        let math, width = 0;
        const read = tempo();
        pauselock = 1;
        v = 1;
        if (type === 0) {
            const select = range(1,3);
            bar.style.width = '0%';
            if (select === 1) {
                math = Math.round((2 * 60 * 1000) / 100);
                const t = randomize(links);
                const audio = new Audio(links[t]);
                chord.textContent = names[t];
                const i = randomize(music);
                div2ba.textContent = music[i];
                audio.play();
                exp = exp + 15;
                clear(math, exp);
                exps[0] = exps[0] + 1;
                setTimeout(() => {
                    audio.pause()
                    store('b', exps);
                    updateTier();
                    v = 0;
                }, Math.round(math * 100))
            } else if (select === 2) {
                const c = randomize(art);
                const t = randomize(objects);
                div2ba.textContent = `${art[c]}: ${objects[t]}`;
                math = Math.round((3 * 60 * 1000) / 100);
                exp = exp + 25;
                clear(math, exp);
                exps[1] = exps[1] + 1;
                setTimeout(() => {
                    store('b', exps);
                    updateTier();
                    v = 0;
                }, Math.round(math * 100))
            } else {
                const i = randomize(observe);
                div2ba.textContent = `${observe[i]}`;
                math = Math.round((5 * 60 * 1000) / 100);
                exp = exp + 65;
                clear(math, exp, 0);
                exps[2] = exps[2] + 1;
                setTimeout(() => {
                    read();
                }, math * 2)
                setTimeout(() => {
                    store('b', exps);
                    updateTier();
                    v = 0;
                }, Math.round(math * 100))
            }
        } else if (type === 1) {
            bar.style.width = '0%';
            if (g === 'Music') {
                math = Math.round((2 * 60 * 1000) / 100);
                const t = randomize(links);
                const audio = new Audio(links[t]);
                chord.textContent = names[t];
                const i = randomize(music);
                div2ba.textContent = music[i];
                audio.play();
                exp = exp + 15;
                clear(math, exp);
                exps[0] = exps[0] + 1;
                setTimeout(() => {
                    audio.pause()
                    store('b', exps);
                    updateTier();
                }, Math.round(math * 100))
            } else if (g === 'Art') {
                const c = randomize(art);
                const t = randomize(objects);
                div2ba.textContent = `${art[c]}: ${objects[t]}`;
                math = Math.round((3 * 60 * 1000) / 100);
                exp = exp + 25;
                clear(math, exp);
                exps[1] = exps[1] + 1;
                setTimeout(() => {
                    store('b', exps);
                    updateTier();
                }, Math.round(math * 100))
            } else if (g === 'Special') {
                const i = randomize(make);
                div2ba.textContent = `${make[i]}`;
                math = Math.round((30 * 60 * 1000) / 100);
                exp = exp + 500;
                clear(math, exp, 0);
                exps[2] = exps[2] + 4;
                setTimeout(() => {
                    read();
                }, 2000)
                setTimeout(() => {
                    store('b', exps);
                    updateTier();
                }, Math.round(math * 100))
            } else {
                const i = randomize(observe);
                div2ba.textContent = `${observe[i]}`;
                math = Math.round((5 * 60 * 1000) / 100);
                exp = exp + 65;
                clear(math, exp, 0);
                exps[2] = exps[2] + 1;
                setTimeout(() => {
                    read();
                }, math * 2)
                setTimeout(() => {
                    store('b', exps);
                    updateTier();
                }, Math.round(math * 100))
            }
        }
    
            function tempo() {
                const min = 60;
                const max = 180;
                const randomBPM = range(min,max);
                const intervalTime = 60000 / randomBPM; 
            
                console.log(`Playing at ${randomBPM} BPM`);
            
                const audio = new Audio('audio/block.wav');
                const interval = setInterval(() => {
                    audio.play();
                }, intervalTime);
            
                return () => {
                    clearInterval(interval);
                };
            }

            function clear(math, exp, audio = 1) {
                const interval = setInterval(() => {
                  if (width < 100) {
                    width++;
                    requestAnimationFrame(() => {
                      bar.style.width = width + '%';
                    });
                  } else {
                    clearInterval(interval);
                    read();
                    if(s > 1) {
                        s--;
                        finish(500);
                    } else {
                        v = 0;
                        s = 0;
                        finish();
                        pauselock = 0;
                        isPaused = false;
                        matching.textContent = 'allow invasions';
                        matching.style.background = '#dfaaa6';
                    }
                    console.log(s);
                    reset();
                    const lv = level(exp);
                    div2bcb.textContent = `${lv[0]} (${lv[1]}/${lv[2]})`;
                    store('a', exp);
                  }
                }, math);
            }
    }

    function reset() {
        bar.style.width = '0%';
        div2ba.textContent = '';
        chord.textContent = '';
    }


    function finish(randomDelay = 0) {
        const min = 2 * 60 * 1000;
        const max = 10 * 60 * 1000;
        if (randomDelay === 0) {
            randomDelay = range(min,max);
        }

        startTime = Date.now();
        remainingTime = randomDelay;
        timeoutId = setTimeout(showAlert, randomDelay);
    }
    
    function showAlert() {
        alert.style.cssText = `visibility: visible;`;
        if(s >= 1) {
            alert.textContent = `Attacking (${s}) . . .`;
        } else {
            alert.textContent = `Invasion Commences . . .`;
        }
        setTimeout(() => {
            alert.style.cssText = `visibility: hidden;`;
            if(s >= 1) {
                match(1);
            } else {
                alert.textContent = "Invasion commences . . .";
                match();
            };
        }, 5000);
    }

    let timeoutId, remainingTime, pauseTime, isPaused = false, startTime;
    function pause() {
        if (!isPaused) {
            clearTimeout(timeoutId);
            pauseTime = Date.now();
            remainingTime -= pauseTime - startTime;
            isPaused = true;
            console.log("Timer paused");
            matching.textContent = 'pause invasions';
            matching.style.background = 'rgb(219 219 219)';
        } else {
            startTime = Date.now();
            timeoutId = setTimeout(showAlert, remainingTime);
            isPaused = false;
            console.log("Timer resumed");
            matching.textContent = 'allow invasions';
            matching.style.background = '#dfaaa6';
        }
    }
    let pauselock = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'p') {
            if (pauselock === 0) {
                pause();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'o') {
            data.e = '';
        }
    });

    finish();
    //addCSSContainer();
}

function randomize(arr) {
  return Math.floor(Math.random() * arr.length);
}

function level(exp) {
    const base = 200;
    const increment = 100;
    let lv = 1;
    let totalExp = 0;

    while (true) {
        let nextExp = base + (lv - 1) * increment;
        if (totalExp + nextExp > exp) break;
        totalExp += nextExp;
        lv++;
    }
    const b = base + (lv - 1) * increment;
    const c = exp - totalExp;
    return [lv,c,b]
}

function tiers(exp) {
    const base = 5;
    const increment = 2;
    let lv = 1;
    let totalExp = 0;

    while (true) {
        let nextExp = base + (lv - 1) * (increment * lv);
        if (totalExp + nextExp > exp) break;
        totalExp += nextExp;
        lv++;
    }
    const b = base + (lv - 1) * (increment * lv);
    const c = exp - totalExp;
    let d = tier[lv - 1];
    let f = lv - 1;
    if(lv > tier.length) {
        d = `${tier[tier.length - 1]}${lv - tier.length}`;
        f = tier.length - 1;
    }
    return [d,c,b,f]
}

function range(mi, ma) {
    const min = mi;
    const max = ma;
    const r = Math.floor(Math.random() * (max - min + 1)) + min;

    return r
}

function skewedRange(min, max) {
    const u = Math.random(); 
    const skewed = 1 - Math.pow(u, 10000000); 
    const r = Math.floor(skewed * (max - min + 1)) + min;
    return r;
}

function addCSSContainer() {
    const container = document.querySelector("div.overlay-wrap");
    const z = updateCSS();

    const f1 = addDiv(container, "f1");
    const f1a1 = addTextarea(f1, "a1");
    f1a1.value = z.textContent;
    const f1a2 = addButton(f1, "a2");
    f1a2.textContent = 'Change';
    f1a2.onclick = function() {
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
    
.divs {
    pointer-events: auto;
    position: absolute;
    height: 80vh;
    width: 60vw;
    background: #7a8199;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    top: 10vh;
    left: 20vw;
    box-sizing: border-box;
    padding: 10px;
} 
    
.alert {
    pointer-events: auto;
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    background: #ffbaba;
    visibility: hidden;
    font-size: 2em;
    text-align: center;
    align-content: center;
    color: #99485d;
}
    
    
.div1 {
    pointer-events: auto;
    position: relative;
    width: 100%;
    height: 30vh;
    display: flex;
    background: #b9e8eb;
    justify-content: center;
    align-items: center;
}
    
.div2 {
    pointer-events: auto;
    position: relative;
    background: #b5aed7;
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
}
    
.div3 {
    pointer-events: auto;
    position: relative;
    height: 20px;
    width: 100%;
    background: #fffdbb;
    display: flex;
    align-items: center;
}
    
    
.chord {
    pointer-events: auto;
    position: absolute;
    height: 90%;
    aspect-ratio: 1;
    background: #ffffff;
    text-align: center;
    align-content: center;
    font-size: 5em;
}
    
    
.buttons {
    pointer-events: auto;
    position: relative;
    height: 100px;
    width: 100px;
    background: #d2e0ff;
}  
    
    
.div2a {
    pointer-events: auto;
    position: relative;
    width: 100%;
    height: 100px;
    display: flex;
    background: #76ee46;
    justify-content: space-between;
}
    
.div2b {
    pointer-events: auto;
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
}
    
.output {
    pointer-events: auto;
    position: absolute;
    flex-grow: 1;
    padding: 10px;
}
    
.div2ba {
    pointer-events: auto;
    position: relative;
    height: 20%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
    
.div2bb {
    pointer-events: auto;
    position: relative;
    height: 70%;
    width: 100%;
}
    
.div2bc {
    pointer-events: auto;
    position: relative;
    width: 100%;
    flex-grow: 1;
    background: #f1ede9;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.bar {
    background: #e5acac;
    transition: width 0.5s ease-in-out;
    height: 100%;
}
    
        
.div2bca {
    pointer-events: auto;
    position: relative;
    padding-left: 5px;
}
      
.matching {
    pointer-events: auto;
    position: absolute;
    height: 30px;
    left: 5px;
    top: 71vh;
    width: 150px;
    background: #dfaaa6;
    justify-content: center;
    display: flex;
    align-items: center;
    color: #4e2c2c;
}
.profile1 {
    pointer-events: auto;
    position: relative;
    height: 60vh;
    display: flex;
    width: 19.6vw;
    top: 10vh;
    left: 5px;
    background: #febdb8;
    flex-direction: column;
}
.profile2 {
    pointer-events: auto;
    position: absolute;
    height: 60vh;
    width: 19.6vw;
    background: #bad3b9;
    display: flex;
    top: 10vh;
    right: 5px;
    flex-direction: column;
}
.p1a {
    pointer-events: auto;
    position: relative;
    height: 30px;
    background: #bb7676;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
}
.p2a {
    pointer-events: auto;
    position: relative;
    height: 30px;
    background: #8fa4a5;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 5px;
}
    
.p1b {
    pointer-events: auto;
    position: relative;
    flex-grow: 1;
    background: #bd9c8f;
}
.p2b {
    pointer-events: auto;
    position: relative;
    flex-grow: 1;
    background: #b2bbb6;
}
.set {
    pointer-events: auto;
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.quest {
    pointer-events: auto;
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.skill {
    pointer-events: auto;
    display: flex;
    position: relative;
    height: 30%;
    background: #e9d6cf;
    flex-direction: row;
    box-sizing: border-box;
    margin: 2px;
}
.list {
    pointer-events: auto;
    display: flex;
    position: relative;
    height: 30%;
    background: #eff9ec;
    flex-direction: row;
    box-sizing: border-box;
    margin: 5px;
}
.stier {
    position: relative;
    flex-grow: 1;
    padding: 5px;
    text-align: center;
    align-content: center;
    font-size: 2em;
}
.sname {
    pointer-events: none;
    position: relative;
    aspect-ratio: 1;
    background: white;
    text-align: center;
    align-content: center;
    color: #9b5384;
}
.stierS {
    position: relative;
    flex-grow: 1;
    padding: 5px;
    display: flex;
    text-align: center;
    font-size: 2em;
    align-items: center;
}
.skillS {
    pointer-events: none;
    display: flex;
    position: absolute;
    height: 30px;
    width: 80px;
    flex-direction: row;
    box-sizing: border-box;
    top: -1.5vh;
    right: 10px;
    z-index: 0;
}
.chat {
    display: flex;
    position: absolute;
    height: 360px;
    width: 19.5vw;
    flex-direction: row;
    box-sizing: border-box;
    right: 0;
    top: 33vh;
    background: #e7e7e7;
    z-index: -1;
}
.input {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    flex-direction: row;
    box-sizing: border-box;
    right: 0;
}
.link {

}
.submity {

}
.ltier {
    pointer-events: none;
    position: relative;
    flex-grow: 1;
    padding: 5px;
    align-content: center;
    font-size: 2em;
}
.lname {
    pointer-events: none;
    position: relative;
    aspect-ratio: 1;
    background: #dbdacb;
    text-align: center;
    align-content: center;
    color: #5f8764;
}
.tree {
    position: absolute;
    width: 100%;
    height: 20px;
    padding: 5px;
    bottom: 5px;
    font-size: small;
    color: #fffaf3;
    box-sizing: border-box;
    left: 0;
}
.treeS {
    position: absolute;
    width: 100%;
    height: 20px;
    text-align: right;
    padding: 5px;
    bottom: 0;
    font-size: small;
    color: #000000;
    box-sizing: border-box;
    left: 0;
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

overlayContents();