export const parseRupiah = (amount: number) => {
    const parsedAmount = isNaN(amount) ? 0 : amount;
    return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(parsedAmount);
};
