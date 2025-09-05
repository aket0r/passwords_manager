const { createApp } = Vue;
let directionName = 'passwords_data';
let dir = os.userInfo().homedir.replaceAll('\\', '/');
let m_dir = `${dir}/Documents/${directionName}`

createApp({
    data() {
        return {
        ip: IP
    }
}}).mount('#ip')


createApp({
    data() {
        return {
        pc: os.hostname()
    }
}}).mount('#pc-name')

createApp({
    data() {
        return {
        os: os.platform()
    }
}}).mount('#win-os-name')

function changeUptime() {
    let uptime = document.querySelector("#win-uptime");
    uptime.innerText = os.uptime();
    setTimeout(changeUptime, 3000); // 10 s
}
changeUptime();

createApp({
    data() {
        return {
        homedir: os.homedir()
    }
}}).mount('#win-homedir')

createApp({
    data() {
        return {
        path: m_dir
    }
}}).mount('#files-path')

createApp({
    data() {
        return {
        id: navigation.currentEntry.id
    }
}}).mount('#userid')

createApp({
    data() {
        return {
        theme: (localStorage.getItem("current-theme") == "0") ? "Белая" : "Тёмная"
    }
}}).mount('#user-theme-choose')
