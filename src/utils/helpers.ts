export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
};

export const validateCoupon = (coupon: string): boolean => {
    const validCoupons = ['SAVE10', 'FREESHIP', 'WELCOME'];
    return validCoupons.includes(coupon);
};

export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};