export type ValidatorFieldType = (value: string) => string | undefined

export const required: ValidatorFieldType = (value) => {
    if (value) 
        return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxLength: number): ValidatorFieldType => (value) => {
    if (value && value.length > maxLength) 
        return 'Max length is more '+ maxLength +' symbols'
    return undefined;
}