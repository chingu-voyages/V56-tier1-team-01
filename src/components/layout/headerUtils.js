
//generating a current date and converting to appropriate format

const currentDate = new Date()

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const year = currentDate.getFullYear()
const month = currentDate.getMonth()
const day = currentDate.getDate()

const displayDate = months[month] + ' ' + day + ', ' + year

export { displayDate }