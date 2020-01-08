
module.exports = {
    timeIntToTimeString: async (timeInt) =>{
        let time = new Date(timeInt);
        return `${time.getFullYear()} / ${time.getMonth() + 1} / ${time.getDay()}    ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    },
}