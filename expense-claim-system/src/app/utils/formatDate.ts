

const formatDate = () => {

    //function convert YYYY-MM-DD → dd/MM/YYYY
    const formatDateToDisplay = (date: string): string => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    //function convert dd/MM/YYYY → YYYY-MM-DD
    const formatDateToISO = (date: string): string => {
        const parts = date.split("/");
        if (parts.length !== 3) return "";
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    };

    const dateToFormatDate = (date: string): string => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    return { formatDateToDisplay, formatDateToISO, dateToFormatDate };
}

export default formatDate;