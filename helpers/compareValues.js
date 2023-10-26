export const isKeyGreaterThanOthers = (item, items, key) => {
    if (!firstItemHasKey(key, item)) {
        return false;
    }
    const firstItemValue = getValueForKey(key, item);

    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        if (
            firstItemHasKey(key, currentItem) &&
            getValueForKey(key, currentItem) > firstItemValue
        ) {
            return false;
        }
    }

    return true;
};

export const firstItemHasKey = (key, item) => {
    const keys = key.split(".");
    let currentObject = item;
    for (const subKey of keys) {
        if (!currentObject || !currentObject.hasOwnProperty(subKey)) {
            return false;
        }
        currentObject = currentObject[subKey];
    }
    return true;
};

export const getValueForKey = (key, item) => {
    const keys = key.split(".");
    let currentObject = item;
    for (const subKey of keys) {
        if (!currentObject || !currentObject.hasOwnProperty(subKey)) {
            return undefined;
        }
        currentObject = currentObject[subKey];
    }
    return currentObject;
};
