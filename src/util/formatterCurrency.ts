// Create our number formatter.
const formatterCurrency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
})
export default formatterCurrency;
