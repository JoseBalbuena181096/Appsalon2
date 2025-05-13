import {parse,formatISO} from 'date-fns';

export function converToISO(strDate){
    const parsedDate = parse(strDate, 'dd/MM/yyyy', new Date());
    return formatISO(parsedDate);
}
