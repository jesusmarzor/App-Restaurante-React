export function dateObject(date) {
    const day = date.getDate();
    const month =  date.getMonth() + 1;
    const year = date.getFullYear();
    return {
        day,
        month,
        year
    };
}

export function dateString(dateObject) {
    return `${dateObject.year}-${(dateObject.month < 10) ? 0 : ''}${dateObject.month}-${(dateObject.day < 10) ? 0 : ''}${dateObject.day}`;
}

export function hourObject(hour) {
    const hourSplit = hour.split(':')
    const h = parseInt(hourSplit[0]);
    const m = parseInt(hourSplit[1]);
    return {
        h,
        m
    };
}

export function hourString(hourObject) {
    return `${hourObject.h}:${hourObject.m}${(hourObject.m === 0) && 0}`;
}