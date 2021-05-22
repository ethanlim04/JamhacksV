export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3333"
        : "https://g5a50u6z60.execute-api.us-east-1.amazonaws.com/prod"

export enum BreakPoints {
    Xs = 0,
    Sm = 576,
    Md = 768,
    Lg = 992,
    Xl = 1200,
    Xxl = 140,
}

export default Object.freeze({
    BreakPoints,
    url,
})