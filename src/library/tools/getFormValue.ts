export const getFormValues = (
    form: HTMLFormElement | null
): Record<string, any> => {
    if (!form) {
        return {};
    }
    const elements = form.elements;
    const obj: any = {};
    for (const element of elements) {
        const name = element.getAttribute('name');
        if (name) {
            // @ts-expect-error there is value
            obj[name] = element['value'];
        }
    }
    return obj;
};
