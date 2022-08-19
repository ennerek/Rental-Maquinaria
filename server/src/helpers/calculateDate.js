const moment = require('moment');

const convertDate = (dateValue) => {
    
    const rentedDateStart = new Date(moment(`${dateValue[0]}`).utc().format('YYYY-MM-DD'));
    const rentedDateEnd = new Date(moment(`${dateValue[1]}`).utc().format('YYYY-MM-DD'));

        
    var Difference_In_Time = rentedDateEnd.getTime() - rentedDateStart.getTime();
        
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


    return Difference_In_Days;
}


module.exports  = {  convertDate };
