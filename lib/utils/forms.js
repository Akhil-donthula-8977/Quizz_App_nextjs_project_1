
export function dateFormatter(dateString){
const dateObj = new Date(dateString);
const day = dateObj.getDate(); 
const month = dateObj.getMonth() + 1;
const year = dateObj.getFullYear(); 
const formattedDate = `${day}-${month}-${year}`;
return formattedDate

}

