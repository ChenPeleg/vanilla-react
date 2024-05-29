export const safeJSONParse = <T>(str: string | null) => {
    if (!str) {
        return null;
    }
    try {
        const jsonValue: T = JSON.parse(str);
        return jsonValue;
    } catch {
        return null;
    }
};
