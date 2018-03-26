const capitalize = (str) => {
    return str.replace(/\b\w/g, l => l.toUpperCase());
};

export {
    capitalize
}
