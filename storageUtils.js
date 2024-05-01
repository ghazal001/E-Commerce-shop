export function setItemToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItemFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}
export function initializeData() {
    let users = getItemFromLocalStorage('users') || [];
    let products = getItemFromLocalStorage('products') || [];
    let productId = getItemFromLocalStorage('productId') || 0;
    let userId = getItemFromLocalStorage('userId') || 0;
    
    return { users, products, productId, userId };
}

export function saveDataToLocalStorage(data) {
    setItemToLocalStorage('users', data.users);
    setItemToLocalStorage('products', data.products);
    setItemToLocalStorage('productId', data.productId);
    setItemToLocalStorage('userId', data.userId);
}