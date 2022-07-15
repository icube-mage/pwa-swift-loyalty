/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    getOfflineTransactionHistory,
} from '@core_modules/customer/services/graphql';

const Core = (props) => {
    const { pageConfig, Content } = props;
    const [dataOfflineTransaction, setDataOfflineTransaction] = useState(undefined);
    const config = {
        title: 'Offline Transaction',
        headerTitle: 'Offline Transaction',
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    const { loading, data, error } = getOfflineTransactionHistory();
    const OFFLINE_TRANSACTION_SCHEMA = Yup.object().shape({
        transactionId: Yup.string().required('Tidak Boleh Kosong'),
        totalPurchase: Yup.string().required('Tidak Boleh Kosong'),
        receipt: Yup.string().required('Tidak Boleh Kosong'),
    });

    const OFFLINE_TRANSACTION_FORM = useFormik({
        initialValues: {
            transactionId: '',
            totalPurchase: '',
            receipt: '',
        },
        validationSchema: OFFLINE_TRANSACTION_SCHEMA,
        onSubmit: async (value) => {
            // eslint-disable-next-line no-console
            console.log(value);
        },
    });

    useEffect(() => {
        if (data && data.getOfflineTransactionHistory.length >= 1) {
            setDataOfflineTransaction(data.getOfflineTransactionHistory);
        }
    }, [data]);

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                loading={loading}
                data={data}
                error={error}
                dataOfflineTransaction={dataOfflineTransaction}
                setDataOfflineTransaction={setDataOfflineTransaction}
                formik={OFFLINE_TRANSACTION_FORM}
                {...props}
            />
        </Layout>
    );
};

export default Core;
