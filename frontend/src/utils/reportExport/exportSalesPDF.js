import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportSalesPDF = (report) => {

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");

    pdf.text(
        "SANT NIRANKARI MISSION",
        105,
        15,
        {
            align: "center"
        }
    );

    pdf.setFontSize(13);

    pdf.text(
        "Siliguri Zone",
        105,
        22,
        {
            align: "center"
        }
    );

    pdf.text(
        "Sales Report",
        105,
        32,
        {
            align: "center"
        }
    );

    pdf.setFontSize(10);

    pdf.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        42
    );

    autoTable(pdf, {

        startY: 50,

        theme: "grid",

        headStyles: {

            fillColor: [37, 99, 235],

            halign: "center",

        },

        head: [[

            "Invoice",

            "Member",

            "Payment",

            "Status",

            "Amount",

            "Date"

        ]],

        body: report.sales.map(sale => [

            sale.invoiceNo,

            sale.member?.fullName,

            sale.paymentMethod,

            sale.paymentStatus,

            `Rs. ${sale.totalAmount}`,

            new Date(
                sale.saleDate
            ).toLocaleDateString()

        ])

    });

    const y =
        pdf.lastAutoTable.finalY + 12;

    pdf.setFontSize(12);

    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.text(

        `Total Records : ${report.totalRecords}`,

        14,

        y

    );

    pdf.text(

        `Total Sales : Rs. ${report.totalSales}`,

        14,

        y + 8

    );

    pdf.save("Sales_Report.pdf");

};