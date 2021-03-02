import { getStoreHost, getHost } from '@helpers/config';
import { modules } from '@config';

const { checkoutOnly, ipayUrl } = modules.checkout;

// URL config redirect
export const getCartCallbackUrl = () => (!checkoutOnly ? '/checkout/cart' : `${getHost()}/checkout/cart`);

export const getSuccessCallbackUrl = () => {
    if (checkoutOnly) return `${getStoreHost()}pwacheckout/onepage/success`;
    return `${getHost()}/checkout/onepage/success`;
};

export const getLoginCallbackUrl = () => {
    const data = `${getStoreHost()}checkout`;
    // eslint-disable-next-line no-buffer-constructor
    const buffer = Buffer.from(data);
    const urlBase64 = buffer.toString('base64');
    if (checkoutOnly) {
        return `${getStoreHost()}customer/account/login/referer/${urlBase64}`;
    }
    return '/customer/account/login?redirect=/checkout';
};

/**
 * [GET] [URL] [IPAY88] redirect url
 * @return {string} [IPAY88] redirect url
 */
export const getIpayUrl = () => {
    const redirectIpay = `${getStoreHost()}${ipayUrl}`;
    return redirectIpay;
};

export default { getCartCallbackUrl, getSuccessCallbackUrl, getLoginCallbackUrl };
