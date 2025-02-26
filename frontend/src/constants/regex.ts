export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/]).*$/;
export const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
export const SAFE_TEXT_REGEX = /^[a-zA-Z0-9\s.,!?'-]+$/;
export const SAFE_TEXT_OPTIONAL_REGEX = /^[a-zA-Z0-9\s.,!?'-]+$|^$/;
