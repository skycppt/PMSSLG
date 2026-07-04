const generateInvoiceNumber = () => {

    const year = new Date().getFullYear();

    const random = Math.floor(
        100000 + Math.random() * 900000
    );

    return `INV-${year}-${random}`;
};

export default generateInvoiceNumber;