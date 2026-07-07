import * as XLSX from "xlsx";

export const exportSalesExcel = (report) => {

    const rows = report.sales.map(sale => ({

        Invoice: sale.invoiceNo,

        Member: sale.member?.fullName,

        Payment: sale.paymentMethod,

        Status: sale.paymentStatus,

        Amount: sale.totalAmount,

        Date: new Date(
            sale.saleDate
        ).toLocaleDateString(),

    }));

    rows.push({});

    rows.push({

        Invoice: "Total Records",

        Member: report.totalRecords,

    });

    rows.push({

        Invoice: "Total Sales",

        Member: report.totalSales,

    });

    const worksheet =
        XLSX.utils.json_to_sheet(rows);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Sales Report"

    );

    XLSX.writeFile(

        workbook,

        "Sales_Report.xlsx"

    );

};