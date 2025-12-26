class Logs {
    constructor() {
        Logs.load(`${m_dir}/logs.json`);
    }

    static async load(file) {
        db.getDBData("logs").then(data => {
            logList = data;
        });
    }

    use(date = null, context, status, upd = true, color, text) {
        if (date == null || !date) date = new Date().toISOString();
        let path = document.querySelector(".history");
        let style = '';
        const time = record(true) // stop recording.
        const item = document.createElement("div");
        item.id = 'item-console-content';
        item.className = status;
        item.innerHTML =
            `<div id="date-of-create">
            ${date}
        </div>
        <div id="message" ${style}>
            ${context || 'OK'} (${time.s}.${time.ms}ms.)
        </div>`
        path.prepend(item);
        if (upd) {
            logList.push({
                createdAt: date,
                message: context?.replaceAll('<br>', '\n'),
                text: text,
                status: status
            })
            this.update({
                createdAt: date,
                message: context?.replaceAll('<br>', '\n'),
                text: text || "<none>",
                status: status
            });
        }
    }

    errors(message = 'Error') {
        try {
            let logsDir = `logs/logs.txt`;
            let data = fs.readFileSync(logsDir).toString();
            fs.writeFile('logs/logs.txt', `${data}[${new Date().toISOString()}] ${message}\n`, null, (e) => { return e })
        } catch (e) {
            fs.mkdirSync(`logs`, (err, files) => { });
            fs.writeFile(`logs/logs.txt`, '', (err) => {
                // console.log(`Файл "${file.message}" добавлен`);
                logs.use(null, `Файл "logs.txt" добавлен.`, 'success', false, 'skyblue')
                if (err) throw err;
            });
        }
    }

    update(item) {
        db.insertData("logs", item);
    }

    async reset(collection = "logs") {
        await db.connectOnce();
        await db.col(collection).deleteMany({});
    }
}

const logs = new Logs();