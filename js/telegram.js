// ==== telegram.js ====
const TelegramBot = require('node-telegram-bot-api');

window.telegram = { bot: null, chatId: null, userId: null };

(function initTelegramImmediate() {
    // Ждём, пока array.js загрузит player
    if (!window.appReady || typeof window.appReady.then !== 'function') {
        console.error("appReady is not defined. Make sure array.js is loaded before telegram.js");
        return;
    }

    window.appReady.then(startTelegram).catch(console.error);
})();

async function startTelegram() {
    const p0 = Array.isArray(window.player) ? window.player[0] : null;
    if (!p0 || !p0.notifications) {
        console.error("player not ready or notifications missing");
        markTokenInvalid("Данные пользователя не загружены");
        return;
    }

    const token = p0.notifications.telegram_token || "";
    const chatId = p0.notifications.chat_id || null;
    const userId = p0.notifications.userid || null;

    if (!token) {
        markTokenInvalid("Токен отсутствует");
        return;
    }

    try {
        const bot = new TelegramBot(token, { polling: true });
        window.telegram.bot = bot;
        window.telegram.chatId = chatId;
        window.telegram.userId = userId;

        markTokenValid();

        // ===== handlers =====
        bot.on('message', (msg) => {
            // Безопасные геттеры
            const p = Array.isArray(window.player) ? window.player[0] : {};
            const uptime = Array.isArray(p?.user?.uptime) ? p.user.uptime : [0, 0, 0];
            const pad = (x) => (x < 10 ? '0' + x : '' + x);
            const usrTime = { h: pad(+uptime[0] || 0), m: pad(+uptime[1] || 0), s: pad(+uptime[2] || 0) };

            switch (msg.text) {
                case '/passwords':
                    if (window.telegram.chatId) {
                        bot.sendDocument(window.telegram.chatId, `${m_dir}/passwords.json`).catch(handleTokenError);
                    }
                    break;

                case '/user': {
                    const sCfg = window.settingsCfg;
                    const passwordsLen = Array.isArray(window.passwords) ? window.passwords.length : 0;
                    const base =
                        `Пользователь *${p?.user?.login || '-'}*\n\n` +
                        `Текущий IP: *${p?.user?.ip || '-'}*\n` +
                        `Регистрация: *${p?.user?.createdAt || '-'}*\n` +
                        `Время в приложении: *${usrTime.h}:${usrTime.m}:${usrTime.s}*\n\n` +
                        `Ошибок входа: ${p?.counter?.fail_access ?? 0}\n` +
                        `Авторизаций: ${p?.counter?.login_times ?? 0}`;

                    const txt = sCfg
                        ? base.replace("Регистрация:", "Регистрация:").replace("Время", `Паролей: *${passwordsLen}*\nВремя`)
                        : base.replace("Паролей: *авторизуйстесь*", "Паролей: *авторизуйстесь*"); // сохранён твой смысл

                    if (window.telegram.chatId) {
                        bot.sendMessage(window.telegram.chatId, txt, { parse_mode: 'Markdown' }).catch(handleTokenError);
                    }
                    break;
                }

                case '/logs':
                    if (window.telegram.chatId) {
                        bot.sendDocument(window.telegram.chatId, `${m_dir}/logs.json`).catch(handleTokenError);
                    }
                    break;

                case '/settings': {
                    const s = window.settingsCfg;
                    if (!s) {
                        bot.sendMessage(window.telegram.chatId, `Авторизуйтесь для просмотра настроек`).catch(handleTokenError);
                    } else {
                        bot.sendMessage(
                            window.telegram.chatId,
                            `Настройки\n\nСкрывать данные: *${s.autoHideData}*\nСкрывать данные в таблице: *${s.hideDataInTable}*`,
                            { parse_mode: 'Markdown' }
                        ).catch(handleTokenError);
                    }
                    break;
                }
            }
        });

        bot.onText(/\/start/, (msg) => {
            bot.sendMessage(msg.chat.id, `Welcome, ${msg.from.first_name}`).catch(handleTokenError);
        });

    } catch (e) {
        handleTokenError(e);
    }
}

// Глобальная функция для отправки сообщений из других частей приложения
window.sendMessage = async function (message) {
    if (!message || !window.telegram.bot || !window.telegram.chatId) return;
    try {
        await window.telegram.bot.sendMessage(window.telegram.chatId, message);
    } catch (e) {
        handleTokenError(e);
        return e;
    }
};

function handleTokenError(e) {
    console.error(e);
    try {
        window.logs?.use?.(null, String(e), 'error');
        window.notification?.use?.('Token error', 'Ваш токен для телеграма не валиден, пожалуйста обновите его');
    } catch { }
    markTokenInvalid('Обновите токен');
}

function markTokenValid() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll(".warning-text").forEach(el => {
        el.classList.add("active");
        el.innerText = 'Токен действителен';
    });
}

function markTokenInvalid(text) {
    if (typeof document === 'undefined') return;
    document.querySelectorAll(".warning-text").forEach(el => {
        el.classList.remove("active");
        el.innerText = text || 'Обновите токен';
    });
}
