import rootInstance from "./utilsService/rootInstance";


const getTotalsPostPerMonth =  (year) => {
    return rootInstance.get("/statitics/post-per-month/"+year);
}

const getTotalsCommentsPerMonth =  (year) => {
    return rootInstance.get("/statitics/comment-per-month/"+year);
}
const getTotalsReplyPerMonth =  (year) => {
    return rootInstance.get("/statitics/reply-per-month/"+year);
}
const getTotalsUserPerMonth =  (year) => {
    return rootInstance.get("/statitics/user-per-month/"+year);
}
const StatiticsService = {
    getTotalsPostPerMonth,
    getTotalsCommentsPerMonth,
    getTotalsReplyPerMonth,
    getTotalsUserPerMonth
};
  
export default StatiticsService;
