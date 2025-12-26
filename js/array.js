const fs = require("fs");
const os = require("os");
const path = require("path");
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');
const md5 = require("md5");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const mongoConfig = {
    dbName: "passwords-manager-db",
    collections: ["users", "passwords", "logs", "system", "settings"],
};

window.player = [];
window.passwords = [];
window.logList = [];
window.count = 4;
window.timeAnimation = null;
window.dataUID = null;
let timeout = null;
let removeBtns, passwordsList, settingsCfg, saveRecorder = null, accesInit, accesInitTime = +localStorage.getItem("isLockedCounter") || 60;

window.time = { h: 0, m: 0, s: 0 };

class DataBase {
    constructor() {
        this.db = null;
    }

    async connectOnce() {
        if (!this.db) {
            await client.connect();
            this.db = client.db(mongoConfig.dbName);
        }
        return this.db;
    }

    col(name) {
        return this.db.collection(name);
    }

    async insertData(collection, data) {
        await this.connectOnce();
        return this.col(collection).insertOne(data);
    }

    async getPassword(collection = 'passwords', uid = null) {
        await this.connectOnce();
        const arr = await this.col(collection).find({ uid }).toArray();
        return arr;
    }

    async getPasswords(collection = "passwords") {
        await this.connectOnce();
        const arr = await this.col(collection).find({}).toArray();
        window.passwords.push(...arr);
        return arr;
    }

    async updateData(collection = "passwords", filter, changes) {
        await this.connectOnce();

        if (!filter || typeof filter !== 'object' || Array.isArray(filter)) {
            return;
        }
        if (!changes || typeof changes !== 'object' || Array.isArray(changes)) {
            throw new Error(
                `updateData: changes must be a plain object. Got: ${typeof changes} ${JSON.stringify(changes)}`
            );
        }

        if (filter._id && typeof filter._id === 'string') {
            try { filter._id = new ObjectId(filter._id); } catch (_) { }
        }

        const res = await this.col(collection).updateOne(filter, { $set: changes });
        return res;
    }

    async replaceData(collection = "users", doc) {
        await this.connectOnce();
        if (!doc || typeof doc !== "object" || Array.isArray(doc)) {
            return;
        }

        const { ObjectId } = require("mongodb");
        let filter = null;

        if (doc._id) {
            filter = { _id: typeof doc._id === "string" ? new ObjectId(doc._id) : doc._id };
        } else if (doc.uid != null) {
            filter = { uid: doc.uid };
        } else {
            throw new Error("replaceData: need _id or uid to locate the document");
        }

        const res = await this.col(collection).replaceOne(filter, doc, { upsert: false });
        return res;
    }


    async getUserData(collection = "users") {
        await this.connectOnce();
        const user = await this.col(collection).find({}).toArray();
        window.player = user;
        return user;
    }

    async getDBData(collection = "users") {
        await this.connectOnce();
        const data = await this.col(collection).find({}).toArray();
        return data;
    }

    async deleteData(collection, filter) {
        await this.connectOnce();
        return this.col(collection).deleteOne(filter);
    }
}

window.db = new DataBase();

window.appReady = (async () => {
    try {
        await window.db.connectOnce();
        await window.db.getUserData();
        return { ok: true };
    } catch (e) {
        console.error("App init error:", e);
        return { ok: false, error: e };
    }
})();
