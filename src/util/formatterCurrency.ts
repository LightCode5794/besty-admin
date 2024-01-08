// Create our number formatter.
const formatterCurrency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
})



export const customCurVND = (value : number) => formatterCurrency.format(value);
export default formatterCurrency;