import React, { useEffect } from 'react';
import { sleep } from '../tools/sleep.ts';

export interface FormState<T extends Record<string, any>> {
    values: T;
    errors: Record<string, string> | null;
    isValid: boolean;
    isTouched: boolean;
}

export interface FormValues<T extends Record<string, any>> {
    /**
     * Validate the form values
     * Return true if the form is valid
     * Return an object with the errors if the form is invalid
     * if the function is too complex might hurt performance
     * @param {T} values
     * @return {Record<string, string> | true}
     */
    validate?: (values: T) => Record<string, string> | true;
    initialValues?: FormState<T>['values'];
}

const FORM_CHANGE_EVENT = 'keydown';
const FORM_CHANGE_EVENT_2 = 'mouseup';

const buildInitialFormState = <T extends Record<string, any>>(
    values: FormValues<T>,
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

export const setFormValues = (
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
            // input.nodeValue = values[name];
            // input.setAttribute('defaultValue', values[name]);
            // input.setAttribute('value', values[name]);
        }
    }
};
export const useFormState = <T extends Record<string, any>>(
    formRef: React.RefObject<HTMLFormElement>,
    formValues?: FormValues<T>
) => {
    const [formState, setFormState] = React.useState<FormState<T>>(
        // @ts-expect-error the values are supposed to be the same
        buildInitialFormState(
            // @ts-expect-error the values are supposed to be the same
            formValues,
            formRef
        )
    );
    const [hasEventListener, setHasEventListener] = React.useState(false);

    const handleFormChangeListener = React.useCallback(() => {
        sleep(100).then(() => {
            if (!formRef || !formRef.current) {
                return;
            }
            const currentValues = getFormValues(formRef.current);

            let errors: null | Record<string, string> | null = null;
            let isValid = true;
            if (formValues?.validate) {
                // @ts-expect-error the values are supposed to be the same
                errors = formValues.validate(currentValues);
                if (errors === null) {
                    isValid = false;
                }
            }
            // @ts-expect-error the values are supposed to be the same
            setFormState((prevState) => ({
                ...prevState,
                values: currentValues,
                errors,
                isValid,
            }));
        });
    }, [formValues]);

    const cleanUpEventListener = React.useCallback(() => {
        if (!formRef || !formRef.current) {
            return;
        }
        formRef.current.removeEventListener(
            FORM_CHANGE_EVENT,
            handleFormChangeListener
        );
        formRef.current.removeEventListener(
            FORM_CHANGE_EVENT_2,
            handleFormChangeListener
        );
    }, []);

    useEffect(() => {
        if (!formRef || !formRef.current) {
            return;
        }

        const currentValues = getFormValues(formRef.current);
        const valuesToSet: Record<string, any> = {};

        for (const key of Object.keys(currentValues)) {
            if (currentValues[key] === '' && formValues?.initialValues) {
                currentValues[key] = formValues?.initialValues[key];
                valuesToSet[key] = formValues?.initialValues[key];
            }
        }

        if (Object.keys(valuesToSet).length > 0) {
            setFormValues(formRef.current, valuesToSet);
        }

        // @ts-expect-error the values are supposed to be the same
        setFormState((prevState) => ({
            ...prevState,
            values: { ...currentValues },
        }));
        if (!hasEventListener) {
            formRef.current.addEventListener(
                FORM_CHANGE_EVENT,
                handleFormChangeListener
            );
            formRef.current.addEventListener(
                FORM_CHANGE_EVENT_2,
                handleFormChangeListener
            );
            setHasEventListener(true);
        }
        return cleanUpEventListener;
    }, [formRef]);

    return formState;
};
