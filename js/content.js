class Content {
    constructor() {
        console.log("Content loading...");
        this.load(false);
    }

    create(obj, update = true, uid = md5(new Date().getTime())) {
        const path = document.querySelector(".main-path");
        const item = document.createElement("div");
        item.setAttribute(`data-brain-index-${uid}`, uid)
        item.className = 'password-item';
        let type = (obj.type == 'app') ? 'fa fa-th-large' : 'fa fa-external-link';
        let typeContent = (obj.type == 'app') ? 'Приложение' : 'Веб-сайт';
        if (obj.source.indexOf('https') < 0 || obj.source.indexOf('http') < 0) {
            obj.source = `https://${obj.source}`;
        }
        let firstSymbolInPass = obj.password.slice(0, 2);
        let firstSymbolInLog = obj.login.slice(0, 2);
        let hidePass = `${firstSymbolInPass}*******`;
        let hideLog = `${firstSymbolInLog}*******`;

        let simpleSource = obj.source?.replace('https', '')?.replaceAll('/', '')?.replace(':', '')?.replace('http', '');
        item.innerHTML =
            `
        <div class="type-icon">
            <span class="pass-type-icon app" style="color: royalblue; cursor: default;">
                <i class="${type}" aria-hidden="true"></i>
                ${typeContent}
            </span>
        </div>
        <div class="type-text">
            <span class="pass-type-text">
                <a href="${obj.source}" target="_blank">${simpleSource}</a>
            </span>
        </div>
        <div class="login-text" data-login="${obj.login}" ondblclick="showLogin(event)">
            <span class="login-content-text" data-login="${obj.login}">${hideLog}</span>
        </div>
        <div class="password-text" data-password="${obj.password}" ondblclick="showPasswrd(event)">
            <span class="password-content-text" data-password="${obj.password}">${hidePass}</span>
        </div>
        <div class="created-at">
            <span class="created-at-text" >${obj.createdAt}</span>
        </div>
        <div class="act-btn edit-pass" data-uid="${uid}">
            <span class="edit-pass-btn" data-uid="${uid}">Редактировать</span>
        </div>
        <div class="act-btn del-pass" data-uid="${uid}">
            <span class="delete-pass-btn" data-uid="${uid}">Удалить</span>
        </div>
        `
        path.prepend(item);
        const data = {
            type: obj.type,
            source: obj.source,
            login: obj.login,
            password: obj.password,
            createdAt: new Date().toLocaleString(),
            uid: uid
        }
        if (update) {
            passwords.push(data)
            logs.use(null, `Новый пользователь добавлен!`, 'success', true);
            this.add(data);
        }
        removeBtns = document.querySelectorAll(".passwords .main-path .delete-pass-btn");
        passwordsList = document.querySelectorAll(".passwords .main-path .password-item");
    }

    update(uid, data) {
        db.updateData('passwords', { uid: uid }, data);
    }

    add(data) {
        db.insertData('passwords', data)
    }

    async load(login = false) {
        if (!login) return;
        console.log("Content created!");
        await db.getPasswords('passwords').then(data => passwords = data);
        await db.getDBData('settings').then(data => {
            if (data.length === 0) {
                db.insertData('settings', {
                    autoHideData: user.getQuery('.item')[0].childNodes[1].childNodes[1].checked,
                    hideDataInTable: user.getQuery('.item')[2].childNodes[1].childNodes[1].checked
                });
            } else {
                settingsCfg = data[0];
            }
        });


        passwords.forEach((el) => {
            this.create({
                type: el.type,
                source: el.source,
                login: el.login,
                password: el.password,
                createdAt: el.createdAt
            }, false, el.uid);
            passList.innerText = `${passwords.length}`;
        });
        let userCreatedAtTxt = document.querySelector("#user-were-created");
        userCreatedAtTxt.innerText = player[0].user.createdAt;
        time.h = player[0].user.uptime[0] || 0;
        time.m = player[0].user.uptime[1] || 0;
        time.s = player[0].user.uptime[2] || 0;
        time.h = (time.h < 10) ? '0' + time.h : time.h;
        time.m = (time.m < 10) ? '0' + time.m : time.m;
        time.s = (time.s < 10) ? '0' + time.s : time.s;
        recordUptime();
        if (!settingsCfg.autoHideData) {
            let checkbox = document.querySelector(".item label input");
            checkbox.checked = false;
            unlockData();
        } else {
            lockData();
        }
    }
}
const content = new Content();

const createBtn = document.querySelector("#confirm-new-passowrd");
const sourceOfEl = document.querySelector("#new-source-value");
const loginOfEl = document.querySelector("#new-login-value");
const passwordOfEl = document.querySelector("#new-password-value");
const typeOfEl = document.querySelector("#type");
const typeSelectOfEl = document.querySelectorAll("#type option");
createBtn.addEventListener("click", function () {
    content.create({
        type: (typeOfEl.selectedIndex == 1) ? 'app' : 'web',
        source: sourceOfEl.value,
        login: loginOfEl.value,
        password: passwordOfEl.value,
        createdAt: new Date().toLocaleString()
    }, true, md5(new Date().getTime()));
    passList.innerText = passwords.length;
    // console.log(passwords.length);
})

