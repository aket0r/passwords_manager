const version = '3.0.5b';
const forms = document.querySelectorAll("form");

forms.forEach(form => {
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
    })
})



const closeCreatebarBtn = document.querySelector("#close-created-bar-btn");
const createBar = document.querySelector("#create-new-pass-bar");

closeCreatebarBtn.addEventListener("click", function () {
    createBar.classList.add("hidden-animation");
});


const addNewPasswordBtn = document.querySelector("#create-new-password");
addNewPasswordBtn.addEventListener("click", function () {
    createBar.classList.remove("hidden-animation");
});

const numbersBtns = document.querySelectorAll(".numbers div");
const numbersJoinBtns = document.querySelectorAll(".numbers-join div");
const userPincodeInput = document.querySelector("#user-pincode-auth");
const userPincodeAuthInput = document.querySelector("#user-pincode");
const nextBtns = document.querySelectorAll("#next");
for (let i = 0; i < numbersBtns.length; i++) {
    numbersBtns[i].addEventListener("click", function () {
        userPincodeInput.value += this.innerText;
        if (!(userPincodeInput.value.length < 4)) {
            let str = userPincodeInput.value.slice(0, 4);
            nextBtns[1].innerHTML = "Продолжить"
            userPincodeInput.value = str;
        } else {
            nextBtns[1].innerHTML = "Пропустить"
        }
    })
}
for (let i = 0; i < numbersBtns.length; i++) {
    numbersJoinBtns[i].addEventListener("click", function () {
        userPincodeAuthInput.value += this.innerText;
        if (userPincodeAuthInput.value.length >= 4) {
            let str = userPincodeAuthInput.value.slice(0, 4);
            userPincodeAuthInput.value = str;
        }
    })
}

userPincodeInput.addEventListener("keyup", function (event) {
    if (this.value.trim() !== "") {
        if (event.key === "Enter") {
            const nextBtn = document.querySelectorAll("#next")[1];
            nextBtn.click();
        }
    }
})

// AUTH
let wrongCounter = localStorage.getItem("isLocked") !== null ? 3 : 0;
const joinAccBtn = document.querySelector("#join-in-account");
const joinAccInput = document.querySelector("#user-pincode");
const loginAccBtn = document.querySelector("#wr-join-in-account");

function authRequest(useMessage = true) {
    let win = document.querySelector(".pincode");
    let value = userPincodeAuthInput.value;
    if (wrongCounter == 3) {
        useMessage === true ? sendMessage(`Ошибка авторизации.\nIP: ${IP}\nДата: ${new Date().toISOString()}`) : '';
        notification.use('#Auth_notification_code', 'Попробуйте другие способы.');
        let pinWin = document.querySelector(".main-content");
        let loginWin = document.querySelector(".main-content-login");
        loginWin.classList.remove("hidden-animation");
        pinWin.classList.add("hidden-animation");
        return;
    }

    if (player[0].user.pincode == value) {
        win.classList.add("hidden-animation");
        logs.use(null, `Успешная авторизация. IP: ${IP}`, 'success');
        sendMessage(`Успешная авторизация.\nIP: ${IP}\nДата: ${new Date().toISOString()}`);
        notification.use("System", `Вход в аккаунт\nIP: ${IP}\n\nДата: ${new Date().toLocaleString()}`);
        player[0].counter.login_times++;
        user.update();
        content.load(true);
    } else {
        player[0].counter.wrong_pincode_count++;
        player[0].counter.fail_access++;
        logs.use(null, `Неверный пин-код. IP: ${IP}`, 'error');
        value = '';
        user.update();
        wrongCounter++;
    }
}

joinAccBtn.addEventListener("click", function () {
    authRequest();
});

joinAccInput.addEventListener("keyup", function (e) {
    const k = e.key;
    if (k == 'Enter') {
        authRequest();
    }
});

let wrongCounter2 = localStorage.getItem("isLocked") !== null ? 3 : 0;

let login_v = document.querySelector("#wr-login");
let pass_v = document.querySelector("#wr-password");
let timer = document.querySelector(".timer");
let h2Title = document.querySelector(".timer h2");

function doesItWrong() {
    if (wrongCounter2 >= 3) {
        login_v.disabled = true;
        pass_v.disabled = true;
        loginAccBtn.disabled = true;
        timer.classList.remove("hidden-animation");
        localStorage.setItem("isLocked", true);
        accesInit = setInterval(() => {
            accesInitTime--;
            h2Title.innerText = accesInitTime;
            if (accesInitTime <= 0) {
                timer.classList.add("hidden-animation");
                accesInitTime = 60;
                h2Title.innerText = accesInitTime;
                login_v.disabled = false;
                pass_v.disabled = false;
                loginAccBtn.disabled = false;
                localStorage.removeItem("isLocked");
                localStorage.removeItem("isLockedCounter");

                setTimeout(() => {
                    location.reload();
                }, 150);
            }
            localStorage.setItem("isLockedCounter", accesInitTime);
        }, 1000);
    }
}

loginAccBtn.addEventListener('click', function () {
    doesItWrong();

    if (!(login_v.value == player[0].user.login)) {
        player[0].counter.wrong_login_count++;
        player[0].counter.wrong_pass_count++;
        player[0].counter.fail_access++;
        logs.use(null, `Неверный логин или пароль. IP: ${IP}`, 'error');
        user.update();
        wrongCounter2++;
        console.log("Wrong login!");
        return;
    }

    if (pass_v.value == player[0].user.password) {
        let win = document.querySelector(".pincode");
        win.classList.add("hidden-animation");
        logs.use(null, `Успешная авторизация. IP: ${IP}. Способ: login_&_password`, 'success');
        sendMessage(`Успешная авторизация.\nIP: ${IP}.\nДата: ${new Date().toISOString()}\nСпособ: login_&_password`);
        notification.use("System", `Вход в аккаунт\nIP: ${IP}\n\nДата: ${new Date().toLocaleString()}`);
        player[0].counter.login_times++;
        user.update();
        content.load(true);
    } else {
        console.log("Wrong password!");
    }
})

userPincodeInput.addEventListener("input", function () {
    if (!(this.value.length < 4)) {
        let str = this.value.slice(0, 4);
        nextBtns[1].innerHTML = "Продолжить"
        this.value = str;
    } else {
        nextBtns[1].innerHTML = "Пропустить"
    }
})


for (let k = 0; k < nextBtns.length; k++) {
    nextBtns[k].addEventListener("click", function () {
        let inc = k + 1;
        inc = (inc > nextBtns.length) ? k : k + 1;
        let windows = document.querySelectorAll(".steps");
        windows[k].classList.add("hidden-animation");
        setTimeout(() => {
            try {
                windows[k].classList.add("hidden");
                windows[inc].classList.remove("hidden");
                windows[inc].classList.remove("hidden-animation");
            } catch (e) {
                logs.errors(e);
            }
        }, 250);
        if ((k + 1) >= nextBtns.length) {
            let bar = document.querySelector(".auth-reg-bar");
            bar.classList.add("hidden-animation")
        }
    })
}

let btn = document.querySelector("#theme-btn");
const openProfileWinBtn = document.querySelector("#m-open-profile-btn");
const settingsShortBtn = document.querySelector("#settings-btn");
const homeBtn = document.querySelector("#m-open-home-btn");
const settingsPage = document.querySelector(".settings-page");
const profileWin = document.querySelector(".profile-page");
const mainPage = document.querySelector(".passwords-page");
const editBar = document.querySelector(".edit-pass-bar");
const themeTitle = document.querySelector("#user-theme-choose");
let themeIcon = document.querySelector("#theme-icon");
btn.addEventListener("click", function () {
    switchTheme();
});


function switchTheme() {
    const storage = localStorage.getItem("current-theme");
    if (!storage) localStorage.setItem("current-theme", '1');
    let cssFile = document.querySelectorAll("#mode-css");

    if (storage == '1') {
        localStorage.setItem("current-theme", '0');
        themeTitle.innerText = "Белая";
        themeIcon.className = "fa fa-sun-o";
        if (!cssFile) return;
        cssFile.forEach(el => el.remove());
    } else {
        localStorage.setItem("current-theme", '1');
        themeIcon.className = "fa fa-moon-o";
        themeTitle.innerText = "Тёмная";

        checkTheme();
    }
}

window.addEventListener("keyup", function (event) {
    let key = event.key;
    // console.log(`CTRL: ${event.ctrlKey} : KEY: ${key}`);
    // Escape helper for quick exit from window
    if (key == 'Escape') {
        if (!themeWin.classList.contains("hidden-animation")) {
            themeWin.classList.add("hidden-animation");
        }
        if (!consoleWin.classList.contains("hidden-animation")) {
            consoleWin.classList.add("hidden-animation");
        }
        if (!createBar.classList.contains("hidden-animation")) {
            createBar.classList.add("hidden-animation");
        }
        if (!editBar.classList.contains("hidden-animation")) {
            editBar.classList.add("hidden-animation");
        }
    }
    if (key == 'F7') {
        consoleWin.classList.remove("hidden-animation")
    }

    // HOME
    if (event.ctrlKey && (key == 'h' || key == 'H')) {
        profileWin.classList.add("hidden");
        settingsPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
    }
    // SETTINGS
    if (event.ctrlKey && (key == 's' || key == 'S')) {
        profileWin.classList.add("hidden");
        mainPage.classList.add("hidden");
        settingsPage.classList.remove("hidden");
    }
    // PROFILE
    if (event.ctrlKey && (key == 'p' || key == 'P')) {
        profileWin.classList.remove("hidden");
        mainPage.classList.add("hidden");
        settingsPage.classList.add("hidden");
    }
})

openProfileWinBtn.addEventListener("click", function () {
    profileWin.classList.remove("hidden");
    mainPage.classList.add("hidden");
    settingsPage.classList.add("hidden");
})

homeBtn.addEventListener("click", function () {
    profileWin.classList.add("hidden");
    settingsPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
})

settingsShortBtn.addEventListener("click", function () {
    profileWin.classList.add("hidden");
    mainPage.classList.add("hidden");
    settingsPage.classList.remove("hidden");
})




let init, h = 0, m = 0, s = 0, ms = 0;
function record(stop = false) {
    if (!stop) {
        init = setInterval(() => {
            ms++;
            if (ms >= 1000) {
                s = s + 1;
                ms = 0;
            }
        }, 1);
    } else {
        clearInterval(init);
        setTimeout(() => {
            h = 0
            m = 0;
            s = 0;
            ms = 0;
        }, 1);
        // console.log({h: h, m: m, s: s, ms: ms})
        return { h: h, m: m, s: s, ms: ms }
    }
}


function runCode(text) {
    if (text.trim() == '') return false;
    record(false); // start recording.
    setTimeout(() => {
        try {
            let command = eval(text);
            logs.use(null, "Выполнено.", 'success', true, null, text);
        } catch (e) {
            logs.use(null, `${e}`, 'error', true, null, text);
            logs.errors(e);
        }
    }, Math.floor(Math.random() * 250));

}

const consoleInput = document.querySelector("#console-command-val");
consoleInput.addEventListener("keyup", function (e) {
    let k = e.key;
    if (k == 'Enter' && !e.shiftKey) {
        runCode(this.value);
        this.value = "";
    }
})


function noConnection() {
    let status = document.querySelector("#internet-status");
    let buttons = document.querySelectorAll("button");
    let exitBtn = document.querySelector("#exit-btn");
    status.classList.remove("hidden");
    buttons.forEach(btn => {
        btn.disabled = true;
    });
    exitBtn.disabled = false;
}

let passList = document.querySelector("#passwords-length");
let loadToken = this.document.querySelector("#user-telegram-token");
let loadChatId = this.document.querySelector("#user-telegram-chatid");
let loadUserId = this.document.querySelector("#user-telegram-userid");

window.addEventListener("load", async function () {
    if (!this.navigator.onLine) return noConnection();

    const authBar = this.document.querySelector(".auth-reg-bar");
    this.setTimeout(() => {
        if (player.length === 0) {
            authBar.classList.remove("hidden-animation");
        }
    }, 500)

    const isLocked = this.localStorage.getItem("isLocked");

    await db.getDBData("system").then(async data => {
        if (data.length === 0) {
            await db.insertData("system", {
                arch: os.arch(),
                type: os.type(),
                platform: os.platform(),
                version: os.version(),
                user: os.userInfo(),
                releaes: os.release(),
                hostname: os.hostname(),
            });
        }
    })


    if (isLocked !== null) {
        doesItWrong();
        authRequest(false);
    } else {
        this.localStorage.removeItem("isLockedCounter");
    }

    let title = this.document.querySelector("title");
    title.innerText = `Passwords v${version}`;
    try {
        if (player[0].user.pincode != '') {
            let pinAuthBar = this.document.querySelector('.pincode');
            pinAuthBar.classList.remove('hidden-animation');
        } else {
            content.load(true);
        }
    } catch (e) {
        logs.use(null, e, "error", false);
    }

    logs.use(null, `Приложение 'Passwords v${version}' успешно запущено.`, "success", false);
    logList.forEach(object => {
        logs.use(object.createdAt, object.message, object.status || 'error', false);
    })
    removeBtns = this.document.querySelectorAll(".passwords .main-path .del-pass");
    passwordsList = this.document.querySelectorAll(".passwords .main-path .password-item");

    passList.innerText = passwords.length;


    try {
        if (player[0].notifications.telegram_token != '') {
            let length = player[0].notifications.telegram_token.length;
            let str = '';
            for (let i = 0; i < length - 5; i++) {
                str += '*';
            }
            loadToken.innerText = `${player[0].notifications.telegram_token.slice(0, 5)}${str}`;
        }

        if (player[0].notifications.chat_id != '') {
            loadChatId.innerText = player[0].notifications.chat_id;
        }

        if (player[0].notifications.userid != '') {
            loadUserId.innerText = player[0].notifications.userid;
        }
    } catch (e) {
        logs.use(null, e, "error", false);
    }
})

let showToken = true;
loadToken.addEventListener("click", function () {
    if (showToken) {
        this.innerText = player[0].notifications.telegram_token;
        this.classList.add("show");
        showToken = false;
    } else {
        let length = player[0].notifications.telegram_token.length;
        let str = '';
        for (let i = 0; i < length - 5; i++) {
            str += '*';
        }
        this.classList.remove("show");
        loadToken.innerText = `${player[0].notifications.telegram_token.slice(0, 5)}${str}`;
        showToken = true;
    }
})


function deletePassowrd(uid, data) {
    logs.use(null, `Пароль для "${data.source}" удален`, 'success', true, null, null);
    sendMessage(`Удален пароль\nIP: ${IP}\nДата: ${new Date().toISOString()}\nИсточник: ${data.source}\nЛогин: ${data.login || 'N/A'}\nПароль: ${data.password || 'N/A'}`);
    db.deleteData('passwords', { uid: uid });
}

const passwordsTable = document.querySelector("#passwords-path .main-path");
passwordsTable.addEventListener("click", async function (event) {
    event.preventDefault();
    const target = event.target.closest(".password-item");
    const UID = target?.querySelector(".edit-pass").dataset.uid;
    let currPwdData;
    await db.getPassword('passwords', UID).then(data => currPwdData = data[0]);
    dataUID = currPwdData;
    if (event.target.classList.contains('edit-pass-btn') || event.target.classList.contains('edit-pass')) {
        let win = document.querySelector(".edit-pass-bar");
        let source = document.querySelector("#edit-source");
        let login = document.querySelector("#edit-login");
        let password = document.querySelector("#edit-password");
        let createdAt = document.querySelector(".log-data .createdAt");
        let icon = document.querySelector("#main-edit-page .top-bar button");
        win.classList.remove("hidden-animation");


        await db.getPassword('passwords', UID).then(data => currPwdData = data[0]);
        source.value = currPwdData.source;
        createdAt.innerText = currPwdData.createdAt;

        if (currPwdData?.updatedAt != null) {
            user.getQuery('.isUpdated')[0].classList.add("active");
            user.getQuery('.latest-update')[0].innerText = currPwdData?.updatedAt;
        } else {
            user.getQuery('.isUpdated')[0].classList.remove("active");
            user.getQuery('.latest-update')[0].innerText = "-";
        }

        icon.innerHTML = (currPwdData.type == 'web') ? '<i class="fa fa-external-link"></i>' : '<i class="fa fa-th-large"></i>'
    }

    if (event.target.classList.contains('delete-pass-btn') || event.target.classList.contains('delete-pass')) {
        console.log('delete button: ok');
        deletePassowrd(UID, dataUID);
        target.remove();
        await db.getPasswords('passwords').then(data => passwords = data);
        passList.innerText = passwords.length;
    }
});



let confirmUpdate = document.querySelector("#save-this-password");
confirmUpdate.addEventListener("click", function () {
    if (!dataUID) return;
    let source = document.querySelector("#edit-source");
    let login = document.querySelector("#edit-login");
    let password = document.querySelector("#edit-password");
    content.update(dataUID.uid, {
        source: source.value.trim(),
        login: login.value.trim(),
        password: password.value.trim(),
        updatedAt: new Date().toLocaleString(),
        latestUpdate: new Date().toLocaleString()
    })
    notification.use("Успех", "Пароль успешно изменён.");
})


const unlockBtn = document.querySelector(".unlock-pass");
const lockBtn = document.querySelector(".lock-pass");
unlockBtn.addEventListener("click", unlockData);
lockBtn.addEventListener("click", lockData);


function lockData() {
    if (passwordsList.length == 0) return;
    let loginTxt = document.querySelectorAll(".main-path .login-content-text");
    let passTxt = document.querySelectorAll(".main-path .password-content-text");
    let counter = 0;
    for (let i = passwords.length - 1; i >= 0; i--) {
        loginTxt[i].innerText = `${passwords[counter].login.slice(0, 2)}*******`;
        passTxt[i].innerText = `${passwords[counter].password.slice(0, 2)}*******`;
        counter++;
    }
}

function unlockData() {
    if (passwordsList.length == 0) return;
    let loginTxt = document.querySelectorAll(".main-path .login-content-text");
    let passTxt = document.querySelectorAll(".main-path .password-content-text");
    let counter = 0;
    try {
        for (let i = passwords.length - 1; i >= 0; i--) {
            loginTxt[i].innerText = passwords[counter].login;
            passTxt[i].innerText = passwords[counter].password;
            counter++;
        }
    } catch (e) {
        logs.errors(e);
    }
}

time.h = (time.h < 10) ? '0' + time.h : time.h;
time.m = (time.m < 10) ? '0' + time.m : time.m;
time.s = (time.s < 10) ? '0' + time.s : time.s;
async function recordUptime() {
    // считаем как числа
    time.s++;
    if (time.s >= 60) {
        time.s = 0;
        time.m++;
    }
    if (time.m >= 60) {
        time.m = 0;
        time.h++;
    }

    // пишем в player
    if (Array.isArray(player) && player[0]) {
        player[0].user.uptime = [time.h, time.m, time.s];
        await user.update(player[0]); // передаём целый объект
    }

    // красиво выводим
    const pad = (n) => String(n).padStart(2, "0");
    const status = document.querySelector("#user-uptime-status");
    status.innerText = `${pad(time.h)}:${pad(time.m)}:${pad(time.s)}`;

    // рекурсивный вызов
    setTimeout(recordUptime, 1000);
}



// userid animation
const writeUserId = document.querySelector("#oauth-userid");
const saveNotifUserId = document.querySelector("#userid-status");

let saveTimer;   // debounce
let hideTimer;   // скрытие индикатора

writeUserId.addEventListener("input", () => {
    const val = writeUserId.value.trim();

    // индикатор "сохраняю…"
    saveNotifUserId?.classList.add("active");

    clearTimeout(saveTimer);
    clearTimeout(hideTimer);

    // лёгкий debounce, чтобы не спамить апдейтами
    saveTimer = setTimeout(async () => {
        try {
            // обновляем локальную модель
            if (Array.isArray(player) && player[0]) {
                player[0] = {
                    ...player[0],
                    notifications: {
                        ...(player[0].notifications || {}),
                        userid: val,
                    },
                };
            }

            // перезаписываем целиком документ пользователя
            await user.update(player[0]); // внутри: db.replaceData('users', player[0])

            // аккуратно скрываем индикатор
            hideTimer = setTimeout(() => {
                saveNotifUserId?.classList.remove("active");
            }, 700);
        } catch (e) {
            console.error("User update failed:", e);
            // можно подсветить ошибку
            saveNotifUserId?.classList.add("error");
            hideTimer = setTimeout(() => {
                saveNotifUserId?.classList.remove("active", "error");
            }, 1500);
        }
    }, 400);
});



// ===== общие хелперы для "инпут → сохранить" =====
function makeFieldSaver({ inputSel, statusSel, apply }) {
    const input = document.querySelector(inputSel);
    const status = document.querySelector(statusSel);
    if (!input) return;

    let saveTimer, hideTimer;

    input.addEventListener("input", () => {
        const val = input.value.trim();

        status?.classList.add("active");
        clearTimeout(saveTimer);
        clearTimeout(hideTimer);

        saveTimer = setTimeout(async () => {
            try {
                // применяем изменение к локальной модели
                if (Array.isArray(player) && player[0]) {
                    apply(player[0], val);
                }

                // перезаписываем документ целиком
                await user.update(player[0]);

                hideTimer = setTimeout(() => status?.classList.remove("active"), 700);
            } catch (e) {
                console.error("Update failed:", e);
                status?.classList.add("error");
                hideTimer = setTimeout(() => status?.classList.remove("active", "error"), 1500);
            }
        }, 400); // debounce
    });
}

// ===== 1) chat_id =====
makeFieldSaver({
    inputSel: "#oauth-chatid",
    statusSel: "#chatid-status",
    apply: (doc, val) => {
        doc.notifications = { ...(doc.notifications || {}), chat_id: val };
    }
});

// ===== 2) telegram_token =====
makeFieldSaver({
    inputSel: "#oauth-vk-token",
    statusSel: "#oauth-vk-token-save",
    apply: (doc, val) => {
        doc.notifications = { ...(doc.notifications || {}), telegram_token: val };
    }
});

// ===== 3) смена пароля (с проверкой старого) =====
(() => {
    const newPassInput = document.querySelector("#new-user-pass");
    const oldPassInput = document.querySelector("#old-user-pass");
    const status = document.querySelector(".load-pass-save");
    if (!newPassInput || !oldPassInput) return;

    let saveTimer, hideTimer;

    newPassInput.addEventListener("input", () => {
        const newPass = newPassInput.value;
        const oldPassTyped = oldPassInput.value;
        const current = Array.isArray(player) ? player[0] : player;

        if (!current || !current.user) return;

        // проверяем старый пароль
        if (current.user.password !== oldPassTyped) return;

        status?.classList.add("active");
        clearTimeout(saveTimer);
        clearTimeout(hideTimer);

        saveTimer = setTimeout(async () => {
            try {
                current.user = { ...(current.user || {}), password: newPass };

                await user.update(current); // полный апдейт

                logs?.use?.(null, "Пароль успешно изменён.", "success");
                notification?.use?.("Аккаунт", "Пароль успешно изменён.");
                sendMessage?.(
                    `Изменения в аккаунте\nДата: ${new Date().toISOString()}\nIP: ${IP}\nПароль успешно изменён.`
                );

                hideTimer = setTimeout(() => status?.classList.remove("active"), 700);
            } catch (e) {
                console.error("Password update failed:", e);
                status?.classList.add("error");
                hideTimer = setTimeout(() => status?.classList.remove("active", "error"), 1500);
            }
        }, 400);
    });
})();


(() => {
    const newPinInput = document.querySelector("#new-user-pin");
    const oldPinInput = document.querySelector("#old-user-pin");
    const status = document.querySelector(".load-pin-save");
    if (!newPinInput || !oldPinInput) return;

    let saveTimer = null;
    let hideTimer = null;

    // Хэлпер: оставляем только цифры и максимум 4 символа
    const normalizePin = (val) => val.replace(/\D/g, "").slice(0, 4);

    newPinInput.addEventListener("input", () => {
        // нормализуем ввод и сразу отражаем в поле
        const normalized = normalizePin(newPinInput.value);
        if (newPinInput.value !== normalized) newPinInput.value = normalized;

        const current = Array.isArray(player) ? player[0] : player;
        if (!current || !current.user) return;

        const oldPin = String(current.user.pincode ?? "");
        const typedOld = normalizePin(oldPinInput.value);

        // Сохранение допускаем только если введён правильный старый PIN и новый длиной 4
        if (typedOld !== oldPin || normalized.length < 4) return;

        status?.classList.add("active");
        status?.classList.remove("error");
        clearTimeout(saveTimer);
        clearTimeout(hideTimer);

        // debounce сохранения
        saveTimer = setTimeout(async () => {
            try {
                current.user = { ...(current.user || {}), pincode: normalized };
                await user.update(current); // полная замена документа (replaceOne внутри)
                hideTimer = setTimeout(() => status?.classList.remove("active"), 700);
            } catch (e) {
                console.error("PIN update failed:", e);
                status?.classList.add("error");
                hideTimer = setTimeout(() => status?.classList.remove("active", "error"), 1500);
            }
        }, 400);
    });

    // По желанию: ограничим ввод и в поле старого PIN
    oldPinInput.addEventListener("input", () => {
        const norm = normalizePin(oldPinInput.value);
        if (oldPinInput.value !== norm) oldPinInput.value = norm;
    });
})();



let reqMessageTxt = document.querySelector("#req-message-txt");
const items = document.querySelectorAll('.item label input');
const soundEffect = document.querySelector("#sound-notification");
items.forEach((element, index) => {
    element.addEventListener("click", function () {
        let checked = this.checked;
        let key = this.dataset.key;
        settingsCfg[key] = checked;
        user.updateSettings();
        let timeout = null;
        reqMessageTxt.classList.add("active");
        if (timeout != null) clearTimeout(timeout);
        timeout = setTimeout(() => {
            reqMessageTxt.classList.remove("active");
        }, 3000);
        soundEffect.play();
    })
});


const deleteAccBtn = document.querySelector("#delete-account-btn");
deleteAccBtn.addEventListener("click", function () {
    let confirmMenu = document.querySelector(".confirm-menu");
    let confirmMenuTxt = document.querySelector(".confirm-menu #confirm-content");
    confirmMenu.classList.remove("hidden-animation");
    confirmMenuTxt.innerText = 'Вы действительно хотите удалить аккаунт?\nДанные будут безвозвратно потеряны. Сделайте копию данные если не уверены в своём решении.';

    let confirmBtnAccept = document.querySelector("#confirm-accept");
    confirmBtnAccept.onclick = user.delete;
})


const hideConfirmMenuBtn = document.querySelector("#confirm-decline");
hideConfirmMenuBtn.addEventListener("click", function () {
    let confirmMenu = document.querySelector(".confirm-menu");
    confirmMenu.classList.add("hidden-animation");
})


const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", function () {
    let items = document.querySelectorAll(".main-path .password-item");
    if (items.length == 0) return;
    let source = document.querySelectorAll(".main-path .password-item .pass-type-text a");
    let login = document.querySelectorAll(".main-path .password-item .login-text .login-content-text");
    let v = this.value.trim();
    for (let i = 0; i < items.length; i++) {
        try {
            if (source[i].innerText.indexOf(v) > -1 || login[i].innerText.indexOf(v) > -1) {
                items[i].classList.remove("hidden");
            } else {
                items[i].classList.add("hidden");
            }
        } catch (e) {
            logs.errors(e);
        }
    }
    if (v == '') {
        items.forEach(item => {
            item.classList.remove("hidden");
        })
    }
});



const userLoginReg = document.querySelector("#user-login-auth");
const userPassReg = document.querySelector("#user-password-auth");

userLoginReg.addEventListener("input", checkRequires.bind(userLoginReg));
userPassReg.addEventListener("input", checkRequires.bind(userPassReg));


const req_object = {
    login: false,
    password: false
}

function checkRequires() {
    const nextBtn = document.querySelectorAll("#next")[0];
    const type = this.dataset.type;
    if (this.value.trim() != "") {
        req_object[type] = true;
    } else {
        req_object[type] = false;
    }

    console.log(type)

    if (req_object.login === true && req_object.password === true) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}