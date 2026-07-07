import asyncHandler from "express-async-handler";

import {

    getSalesReport,

} from "../services/reports/salesReportService.js";

export const salesReport =
asyncHandler(

async(req,res)=>{

const report=
await getSalesReport(

req.query

);

res.status(200).json({

success:true,

message:
"Sales report generated.",

data:report,

});

}

);