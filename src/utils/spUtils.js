const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

export const getPassedTime = (time) => {
    let currentTime = new Date();
    let diff = currentTime - time;
    
    if (diff < 86400000) {
        let msec = diff;
        let hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            let mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            let ss = Math.floor(msec / 1000);
            msec -= ss * 1000;
        if (diff > 3600000) {
            return hh + (hh > 1 ? " hours" : " hour");
        } else if (diff > 60000) {
            return mm + (mm > 1 ? " minutes" : " minute");
        } else {
            return ss + (ss > 1 ? " seconds" : " second");
        }
    } else if (diff < 604800000) {
        let dayĐiff = new Date(diff).getDate();
        return dayĐiff + (dayĐiff > 1 ? " days" : " day");
    } else if (diff < 31536000000) {
        return monthNames[time.getMonth()] + " " + time.getDate();
    } else {
        return monthNames[time.getMonth()] + " " + time.getDate() + ", " + time.getYear();
    }

}

export const isURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(str);
}


export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  