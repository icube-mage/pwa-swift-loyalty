// Library
import React from 'react';
import { modules } from '@config';
import Layout from '@layout_customer';
import gqlService from '@core_modules/customer/services/graphql';

const Customer = (props) => {
    const {
        t, Skeleton, CustomerView, storeConfig, isLogin, reOrder, ...other
    } = props;
    let userData = {};
    const { data, loading, error } = gqlService.getCustomer(storeConfig);

    if (!data || loading || error) {
        return (
            <Layout {...props}>
                <Skeleton />
            </Layout>
        );
    }
    if (data) {
        userData = data;
    }
    const menu = [
        { href: '/customer/account/profile', title: t('customer:menu:myAccount') },
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/swiftloyalty/offlinetransaction', title: 'Offline transaction' },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        { href: '/customer/account/profile', title: t('customer:menu:accountInformation') },
    ];

    return (
        <Layout {...props}>
            <CustomerView
                {...other}
                t={t}
                modules={modules}
                menu={menu}
                userData={userData}
                storeConfig={storeConfig}
                isLogin={isLogin}
                reOrder={reOrder}
            />
        </Layout>
    );
};

export default Customer;
