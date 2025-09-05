class User {
    constructor() {
        // User.buildBase();
        this.load();
    }

    getQuery(arg) {
        let elements = document.querySelectorAll(arg);
        return elements;
    }

    async createUser() {
        settingsCfg = {
            autoHideData: this.getQuery('.item')[0].childNodes[1].childNodes[1].checked,
            hideDataInTable: this.getQuery('.item')[2].childNodes[1].childNodes[1].checked
        }

        await db.insertData('users', {
            user: {
                login: this.getQuery('#user-login-auth')[0].value || '',
                password: this.getQuery('#user-password-auth')[0].value || '',
                pincode: this.getQuery('#user-pincode-auth')[0].value || '',
                uptime: [],
                createdAt: new Date().toLocaleString(),
                uid: navigation.currentEntry.id,
                ip: IP,
                platform: {
                    name: os.hostname,
                    nick: os.userInfo().username,
                    sys: os.platform()
                }
            },
            notifications: {
                telegram_token: this.getQuery('#user-token-auth')[0].value || '',
                chat_id: this.getQuery('#user-chat_id-auth')[0].value || '',
                userid: this.getQuery('#user-user_id-auth')[0].value || ''
            },
            counter: {
                fail_access: 0,
                wrong_pass_count: 0,
                wrong_login_count: 0,
                wrong_pincode_count: 0,
                login_times: 1
            }
        })

        console.log('Create new settings config...');

        content.load();
        logs.use(null, `Новый пользователь созадан.`, 'success', true);
    }
    async update(player) {
        return db.replaceData("users", player);
    }
    async load() {
        await db.getUserData('users').then(async data => {
            if (data.length !== 0) {
                await db.getDBData("settings").then(sData => {
                    settingsCfg = sData;
                })
            }
        })
    }

    updateSettings(data = settingsCfg) {
        if (!data) return;
        db.updateData('settings', data);
    }

    delete() {
        let confirmBtnAccept = document.querySelector("#confirm-accept");
        confirmBtnAccept.disabled = true;
        db.deleteData('users', player[0].uid);
        logs.use(null, 'Пользователь успешно удален.', 'success');
        sendMessage(`Уведомлени системы\n\nПользователь был успешно удален.\nДата: ${new Date().toISOString()}\nIP: ${IP}`);
        notification.use('System', 'Перезагрузка.');
        setTimeout(() => {
            location.reload();
        }, 4000);
    }
}

const user = new User();
const join = document.querySelector(".register-confirm");
join.addEventListener("click", function () {
    player = user.createUser();
    location.reload();
})
