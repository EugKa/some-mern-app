import moment from "moment";

export function dateConvertor(date: Date) {
   return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}