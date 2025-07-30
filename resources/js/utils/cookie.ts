export const getCookie = (name: string) => {
    const r = new RegExp(name + '=([^;]+)');
    const v = r.exec(document.cookie);
    return v !== null ? decodeURIComponent(v[1]) : null;
};
