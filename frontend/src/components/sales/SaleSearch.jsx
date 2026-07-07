function SaleSearch({

value,

onChange,

}){

return(

<input

type="text"

placeholder="Search by Invoice, Member Name or Member ID or Date..."

value={value}

onChange={onChange}

className="w-full mb-6 border rounded-lg px-4 py-3"

/>

);

}

export default SaleSearch;