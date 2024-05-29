export const trimTextByWord = (name: string, maxElementNameLength = 45) => {
    let threeDots = '';
    if (!name) {
        name = '';
    }
    let trimedName = '';
    const words = name.split(' ');
    for (const word of words) {
        if (trimedName.length > maxElementNameLength) {
            break;
        }
        trimedName += word + ' ';
    }
    if (name.length > maxElementNameLength) {
        threeDots = '...';
    }
    trimedName = trimedName.trim();
    const lastChar = trimedName[trimedName.length - 1];
    if (lastChar === ',' || lastChar === '.') {
        trimedName = trimedName.slice(0, trimedName.length - 1);
    }
    return trimedName + threeDots;
};
