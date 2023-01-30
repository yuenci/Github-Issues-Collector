export function validEmail(email) {
    return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}