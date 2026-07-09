import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (data) => {

  const { sale, items } = data;

  const pdf = new jsPDF();

// ======================================
// HEADER
// ======================================

pdf.setFillColor(25, 118, 210);
pdf.rect(0, 0, 210, 33, "F");

pdf.setTextColor(255, 255, 255);
pdf.setFont("helvetica", "bold");
pdf.setFontSize(22);

pdf.text(
  " SANT NIRANKARI MANDAL ",
  105,
  14,
  { align: "center" }
);

// pdf.setFontSize(12);
// pdf.text(
//   "SANT NIRANKARI MANDAL",
//   105,
//   19,
//   { align: "center" }
// );

pdf.setFontSize(18);

pdf.text(
  "Siliguri Zone",
  105,
  22,
  { align: "center" }
);

pdf.text(
  "Publication",
  105,
  30,
  { align: "center" }
);

pdf.setTextColor(0,0,0);


pdf.setFontSize(10);

pdf.text(
  "Address : Siliguri, West Bengal",
  15,
  40
);

pdf.text(
  "Phone : +91 XXXXXXXXXX",
  85,
  40
);

pdf.text(
  "Email : publication@snm.org",
  140,
  40
);

pdf.line(15,42,195,42);



pdf.setFontSize(18);
pdf.setFont("helvetica","bold");

pdf.text(
  "INVOICE",
  105,
  50,
  {align:"center"}
);

// pdf.line(15,72,195,72);



pdf.roundedRect(
  15,
  55,
  180,
  32,
  2,
  2
);
pdf.setFontSize(11);

pdf.setFont("helvetica", "bold");

pdf.text("Invoice No :", 30, 63);
pdf.text("Date :", 30, 70);

pdf.text("Payment :", 120, 63);
pdf.text("Status :", 120, 70);

pdf.setFont("helvetica", "normal");

pdf.text(sale.invoiceNo, 60, 63);

pdf.text(
  new Date(sale.saleDate).toLocaleDateString(),
  60,
  70
);

pdf.text(
  sale.paymentMethod,
  150,
  63
);

pdf.text(
  sale.paymentStatus,
  150,
  70
);

// =============================
// UPI Details
// =============================

if (sale.paymentMethod === "UPI") {

  pdf.setFont("helvetica", "bold");

  pdf.text(
    "Transaction ID :",
    30,
    77
  );

  pdf.text(
    "Payment Time :",
    120,
    77
  );

  pdf.setFont("helvetica", "normal");

  pdf.text(
    sale.upiTransactionId || "-",
    65,
    77
  );

  pdf.text(
    sale.upiPaymentDate
      ? new Date(
          sale.upiPaymentDate
        ).toLocaleString()
      : "-",
    150,
    77
  );

}






pdf.roundedRect(
  15,
  92,
  180,
  25,
  2,
  2
);

pdf.setFont("helvetica","bold");

pdf.text(
  "Member Details",
  30,
  97
);

pdf.setFont("helvetica","normal");

pdf.text(
  `Member ID : ${sale.member.memberId}`,
  30,
  107
);

pdf.text(
  `Name : ${sale.member.fullName}`,
  30,
  114
);

pdf.text(
  `Phone : ${sale.member.phone}`,
  120,
  107
);

pdf.text(
  `Address : ${sale.member.address || "-"}`,
  120,
  114
);






autoTable(pdf,{

startY:127,

theme:"grid",

headStyles:{

fillColor:[25,118,210],

textColor:255,

fontStyle:"bold",

},

alternateRowStyles:{

fillColor:[248,249,250],

},

styles:{

fontSize:9,

cellPadding:2,

overflow:"linebreak",

},

headStyles:{

fillColor:[25,118,210],

fontSize:10,

halign:"center",

},

bodyStyles:{

fontSize:9,

},

columnStyles:{

0:{cellWidth:12,halign:"center"},

1:{cellWidth:78},

2:{cellWidth:20,halign:"center"},

3:{cellWidth:35,halign:"right"},

4:{cellWidth:35,halign:"right"},

},

head:[[

"S.No",

"Book",

"Qty",

"Price",

"Total"

]],

body:items.map((item,index)=>([

index+1,

item.book.title,

item.quantity,

`Rs. ${item.sellingPrice}`,

`Rs. ${item.total}`

]))

});







const y =
pdf.lastAutoTable.finalY+12;

pdf.roundedRect(
120,
y,
70,
20,
2,
2
);

pdf.setFont(
"helvetica",
"bold"
);
const totalBooks =
items.reduce(

(sum,item)=>sum+item.quantity,

0
);

pdf.text(
`Total Books : ${totalBooks}`,
125,
y+8
);

pdf.setFontSize(14);


pdf.text(
`Grand Total : Rs. ${sale.totalAmount}`,
125,
y+15,
);







const footerY=y+28;

pdf.line(
15,
footerY,
195,
footerY
);

pdf.setFontSize(10);

pdf.text(
"Dhan Nirankar Ji.",
105,
footerY+10,
{
align:"center"
}
);

pdf.text(
"Sant Nirankari Mission",
105,
footerY+18,
{
align:"center"
}
);

pdf.text(
"This is a computer generated invoice.",
105,
footerY+26,
{
align:"center"
}
);


pdf.save(`${sale.invoiceNo}.pdf`);
};