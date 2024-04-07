const targetNames = ['Akazukin', 'Aladdin', 'Alice', 'Cinderella', 'Dorothy', 'Gretel', 'Hameln', 'Ibarahime', 'Kaguyahime', 'LittlePigs', 'MatchGirl', 'Mermaid', 'Nutcracker', 'Pinocchio', 'Rapunzel', 'SnowWhite'];
const characterArrays = {};
const tier1 = ["パラディン", "ガンナー", "クラッシャー", "ブレイカー", "ソーサラー", "ミンストレル", "クレリック"];
const tier3 = ["メイジ", "傲獅のブレイカー", "憤狼のクラッシャー", "嫉蛇のガンナー", "慾鴉のパラディン", "餐虎のソーサラー", "怠熊のミンストレル", "淫蠍のクレリック", "剛神のブレイカー", "耐神のクラッシャー", "慮神のガンナー", "忠神のパラディン", "智神のソーサラー", "純神のミンストレル", "寛神のクレリック", "オルタナティブ", "オルタナティブ・ブラッド", "ハーフナイトメア", "ブレイカーExt", "ガンナーExt", "Luxury", "Funeral", "Pre.Half", "Alt.Half", "Alt.Pre.Half"]
const tier4 = ["6thAnniv.", "5thAnniv.", "3rdAnniv.", "World", "WGC", "BookofLibrary", "OverExt", "作者篇", "神魔"];
for (let i = 0; i < charactersDB.length; i++) {
    const engName = charactersDB[i].EngName;
    if (targetNames.includes(engName)) {
        const paddedNumber = String(charactersDB[i].ID).padStart(3, '0');
        const ID = charactersDB[i].ID;
        const url = `https://sinoalice.game-db.tw/images/character_l/${paddedNumber}.png`;
        const job = charactersDB[i].Weapon;
        const classname = charactersDB[i].Job;
        let tier = 3
if (tier1.includes(classname)) {tier = 1}
if (tier4.indexOf(classname) !== -1) {tier = 4}
        let element = "Wind"; 
if (["Akazukin", "Cinderella", "Ibarahime", "Dorothy", "LittlePigs", "MatchGirl"].includes(engName)) {
    if (["傲獅のブレイカー", "憤狼のクラッシャー", "嫉蛇のガンナー", "慾鴉のパラディン", "餐虎のソーサラー", "怠熊のミンストレル", "淫蠍のクレリック"].includes(classname)) {
        element = "Water"; 
    } else if (["剛神のブレイカー", "耐神のクラッシャー", "慮神のガンナー", "忠神のパラディン", "智神のソーサラー", "純神のミンストレル", "寛神のクレリック"].includes(classname)) {
        element = "Wind";
    } else {
        element = "Fire"; 
    }
}

if (["Alice", "Kaguyahime", "Mermaid", "Aladdin", "Hameln"].includes(engName)) {
    if (["傲獅のブレイカー", "憤狼のクラッシャー", "嫉蛇のガンナー", "慾鴉のパラディン", "餐虎のソーサラー", "怠熊のミンストレル", "淫蠍のクレリック"].includes(classname)) {
        element = "Wind"; 
    } else if (["剛神のブレイカー", "耐神のクラッシャー", "慮神のガンナー", "忠神のパラディン", "智神のソーサラー", "純神のミンストレル", "寛神のクレリック"].includes(classname)) {
        element = "Fire";
    } else {
        element = "Water"; 
    }
}

if (["SnowWhite", "Pinocchio", "Gretel", "Nutcracker", "Rapunzel"].includes(engName)) {
    if (["傲獅のブレイカー", "憤狼のクラッシャー", "嫉蛇のガンナー", "慾鴉のパラディン", "餐虎のソーサラー", "怠熊のミンストレル", "淫蠍のクレリック"].includes(classname)) {
        element = "Fire"; 
    } else if (["剛神のブレイカー", "耐神のクラッシャー", "慮神のガンナー", "忠神のパラディン", "智神のソーサラー", "純神のミンストレル", "寛神のクレリック"].includes(classname)) {
        element = "Water";
    } else {
        element = "Wind"; 
    }
}

        if (!characterArrays[engName]) {
            characterArrays[engName] = [];
                        if (characterArrays[engName].length > 9) {
    tier = 2;
}
        }

let role = 0;
        characterArrays[engName].push({ ID: ID, tier: tier, job: job, class: classname, element: element, role: role, url: url, HP: 0, pAtk: 0, mAtk: 0, pDef: 0, mDef: 0, spd: 500});
    }
}
let totalClasses = 0;
Object.keys(characterArrays).forEach(function(engName) {
    const characters = characterArrays[engName];
    const thirds = (characters.length - 10) * (1/5);
    const wholeNumber = Math.round(thirds);
    var cC = [];
    var rolecount = [];
    var aC = 0;
    let vex = [];
    for (let i = 1; i < 9; i++) {
    var nest = characters.filter(character => character.job === i).length;
    cC.push(nest);
    aC += nest;
    vex.push(0)
    }
    totalClasses += aC;
    console.log(engName + ": " + cC+" = "+ aC);
    let tier3Count = 0;
    characters.forEach(function(character) {
    const HPmin = 14400;	const HPmax = 15900;
    const Atkmin = 4800;	const Atkmax = 5300;
    const Defmin = 4800;	const Defmax = 5300;
    const Spdmin = 490;	const Spdmax = 550;
    let HPvalue, Atkvalue, Defvalue, Spdvalue;
    const HPvar = Math.round((HPmax - HPmin) * Math.random() + HPmin);
    const Atkvar = Math.round((Atkmax - Atkmin) * Math.random() + Atkmin);
    const Defvar = Math.round((Defmax - Defmin) * Math.random() + Defmin);
    const Spdvar = Math.round((Spdmax - Spdmin) * Math.random() + Spdmin);
    switch (character.job) {
        case 1: if (Math.random() > (((aC - cC[0])-(aC/5))/aC)) {character.role = 4} else {character.role = 3} break;
        case 2: if (Math.random() > (((aC - cC[1])-(aC/5))/aC)) {character.role = 2} else {character.role = 1} break;
        case 3: if (Math.random() > (((aC - cC[2])-(aC/5))/aC)) {character.role = 1} else {character.role = 2} break;
        case 4: if (Math.random() > (((aC - cC[3])-(aC/5))/aC)) {character.role = 3} else {character.role = 4} break;
        case 5: if (Math.random() > (((aC - cC[4])-(aC/5))/aC)) {character.role = 2} else {character.role = 4} break;
        case 6: if (Math.random() > (((aC - cC[5])-(aC/5))/aC)) {character.role = 4} else {character.role = 2} break;
        case 7: if (Math.random() > (((aC - cC[6])-(aC/5))/aC)) {character.role = 1} else {character.role = 3} break;
        case 8: if (Math.random() > (((aC - cC[7])-(aC/5))/aC)) {character.role = 3} else {character.role = 1} break;
    }
if (/(Ext|R0|H31)/.test(character.class)) {character.tier = 4}
if (character.role == 1) {
    HPvalue = Math.round(HPvar * 1);
    Atkvalue = Math.round(Atkvar * 1.2);
    Defvalue = Math.round(Defvar * 0.8);
    Spdvalue = Math.round(Spdvar * 1);
} else if (character.role == 2) {
    HPvalue = Math.round(HPvar * 1);
    Atkvalue = Math.round(Atkvar * 1);
    Defvalue = Math.round(Defvar * 1);
    Spdvalue = Math.round(Spdvar * 1);
} else if (character.role == 3) {
    HPvalue = Math.round(HPvar * 1.2);
    Atkvalue = Math.round(Atkvar * 0.8);
    Defvalue = Math.round(Defvar * 1);
    Spdvalue = Math.round(Spdvar * 1);
} else {
    HPvalue = Math.round(HPvar * 1.2);
    Atkvalue = Math.round(Atkvar * 0.8);
    Defvalue = Math.round(Defvar * 1.2);
    Spdvalue = Math.round(Spdvar * 0.9);
};
character.HP = HPvalue;
character.spd = Spdvalue;
if (character.job == 1 || character.job == 2 || character.job == 3 || character.job == 4){
    character.mAtk = Math.round(Atkvalue * (0.55 + (0.05 * Math.random())));
    character.pAtk = Atkvalue - character.mAtk;
    character.mDef = Math.round(Defvalue * (0.55 + (0.05 * Math.random())));
    character.pDef = Defvalue - character.mDef;
} else { 
    character.pAtk = Math.round(Atkvalue * (0.55 + (0.05 * Math.random())));
    character.mAtk = Atkvalue - character.pAtk;
    character.mDef = Math.round(Defvalue * (0.55 + (0.05 * Math.random())));
    character.pDef = Defvalue - character.mDef;
};
        if (character.tier === 3 && tier3Count < wholeNumber && tier3.indexOf(character.class) === -1) {
            character.tier = 2;
            tier3Count++;
        };

if (character.tier == 4) {
    character.HP = Math.round(1.1 * character.HP);
    character.pAtk = Math.round(1.1 * character.pAtk);
    character.mAtk = Math.round(1.1 * character.mAtk);
    character.pDef = Math.round(1.1 * character.pDef);
    character.mDef = Math.round(1.1 * character.mDef);
    character.spd = Math.round(1.1 * character.spd);
};
    });
});
console.log(characterArrays);