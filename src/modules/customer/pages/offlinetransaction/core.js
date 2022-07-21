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
    createOfflineTransaction,
} from '@core_modules/customer/services/graphql';

const Core = (props) => {
    const { pageConfig, Content, customerData } = props;
    const [dataOfflineTransaction, setDataOfflineTransaction] = useState(undefined);
    const [postOfflineTransaction] = createOfflineTransaction();
    const {
        loading, data, error, refetch,
    } = getOfflineTransactionHistory();

    const config = {
        title: 'Offline Transaction',
        headerTitle: 'Offline Transaction',
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    const emailCustomer = customerData.email;

    const OFFLINE_TRANSACTION_SCHEMA = Yup.object().shape({
        email: Yup.string().required('Tidak Boleh Kosong'),
        transactionId: Yup.string().required('Tidak Boleh Kosong'),
        total_purchase: Yup.number().required('Tidak Boleh Kosong'),
        image_base64: Yup.string().required('Tidak Boleh Kosong'),
    });

    const formik = useFormik({
        initialValues: {
            transactionId: '',
            total_purchase: '',
            // filename: '',
            image_base64: '',
            email: emailCustomer,
        },
        validationSchema: OFFLINE_TRANSACTION_SCHEMA,
        onSubmit: (values, { resetForm }) => {
            window.backdropLoader(true);
            const variables = {
                email: values.email,
                receipt: values.image_base64,
                total_purchase: parseInt(values.total_purchase),
                transaction_id: values.transactionId,
            };
            postOfflineTransaction({ variables })
                .then((res) => {
                    window.backdropLoader(true);
                    window.toastMessage({
                        open: true,
                        text: `Success adding offline transaction, ${res.data.createOfflineTransaction.message}`,
                        variant: 'success',
                    });
                    resetForm({});
                    refetch();
                }).catch((e) => {
                    window.backdropLoader(true);
                    window.toastMessage({
                        open: true,
                        text: e.message.split(':')[1] || e.message,
                        variant: 'error',
                    });
                });
        },
    });

    useEffect(() => {
        if (data && data.getOfflineTransactionHistory.length >= 1) {
            setDataOfflineTransaction(data.getOfflineTransactionHistory);
        }
    }, [data]);

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('image_base64', baseCode);
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                loading={loading}
                data={data}
                error={error}
                dataOfflineTransaction={dataOfflineTransaction}
                setDataOfflineTransaction={setDataOfflineTransaction}
                formik={formik}
                handleDropFile={handleDropFile}
                postOfflineTransaction={postOfflineTransaction}
                {...props}
            />
        </Layout>
    );
};

export default Core;
