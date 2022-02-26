export const isEmailValid = (email: string) => !!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
