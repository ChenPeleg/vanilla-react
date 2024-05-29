import React, { useEffect } from 'react';

export interface FormState<T extends Record<string, any>> {
    values: T;
    isValid: boolean;
    isTouched: boolean;
}

const buildInitialFormState = <T extends Record<string, any>>(
    values: T,
    formRef: React.MutableRefObject<HTMLFormElement | undefined>
) => {
    const nativeFormValues = getFormValues(formRef?.current);
    return {
        values: {
            ...nativeFormValues,
            ...values?.initialValues,
        },
        errors: null,
        isValid: true,
        isTouched: false,
    };
};

export const getFormValues = (
    form: HTMLFormElement | undefined
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

export const setFormValuesInElements = (
    form: HTMLFormElement | undefined,
    values: Record<string, any>
): void => {
    if (!form) {
        return;
    }
    const elements = form.elements;
    for (const element of elements) {
        const name = element.getAttribute('name');
        if (name && values[name] !== undefined) {
            const input =
                form.querySelector(`input[name="${name}"]`) ||
                form.querySelector(`textarea[name="${name}"]`);
            if (!input) {
                continue;
            }
            // @ts-expect-error there is value
            input.defaultValue = values[name];
        }
    }
};
export const useFormState = <T extends Record<string, any>>(
    formRef: React.RefObject<HTMLFormElement>,
    formProperties?: { initialValues: T }
): FormState<T> & { setField: (name: string, value: any) => void } => {
    const [formState, setFormState] = React.useState<FormState<T>>(
        // @ts-expect-error the values are supposed to be the same
        buildInitialFormState(formProperties, formRef)
    );
    const setField = (name: string, value: any) => {
        setFormState((prevState) => ({
            ...prevState,
            isTouched: true,
            values: {
                ...prevState.values,
                [name]: value,
            },
        }));
    };

    const onChangeListener = (
        changeEvent: React.FormEvent<HTMLFormElement>
    ) => {
        const target = changeEvent.target as HTMLInputElement;
        if (!target) {
            return;
        }
        const name = target.getAttribute('name');
        if (!name) {
            return;
        }
        const value = target.value;
        setField(name, value);
        if (formRef.current) {
            const validity = formRef.current.checkValidity();
            if (validity !== formState.isValid) {
                setFormState((prevState) => ({
                    ...prevState,
                    isValid: validity,
                }));
            }
        }
    };

    useEffect(() => {
        if (!formRef || !formRef.current) {
            return;
        }
        const currentValues = getFormValues(formRef.current);
        const valuesToSet: Record<string, any> = {};
        for (const key of Object.keys(currentValues)) {
            if (currentValues[key] === '' && formProperties?.initialValues) {
                currentValues[key] = formProperties?.initialValues[key];
                valuesToSet[key] = formProperties?.initialValues[key];
            }
        }

        if (Object.keys(valuesToSet).length > 0) {
            setFormValuesInElements(formRef.current, valuesToSet);
        }

        // @ts-expect-error the values are supposed to be the same
        setFormState((prevState) => ({
            ...prevState,
            values: { ...currentValues },
        }));

        formRef.current.onchange = (ev: any) => onChangeListener(ev);
    }, [formRef]);

    return {
        ...formState,
        setField,
    };
};
