export function getCurrentTime(){
    const now = new Date();
    let currentHour = now.getHours();
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    let periodOfDay;

    if (currentHour >= 12) {
        periodOfDay = 'PM';
        if (currentHour > 12) {
            currentHour -= 12;
        }
    } else {
        periodOfDay = 'AM';
        if (currentHour === 0) {
            currentHour = 12;
        }
    }

    return `${currentHour}:${currentMinutes} ${periodOfDay}`;

}