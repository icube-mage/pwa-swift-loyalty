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
    const config = {
        title: 'Offline Transaction',
        headerTitle: 'Offline Transaction',
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    const { loading, data, error } = getOfflineTransactionHistory();
    const [postOfflineTransaction] = createOfflineTransaction();

    const validationSchema = Yup.object().shape({
        transactionId: Yup.string().required('Tidak Boleh Kosong'),
        total_purchase: Yup.string().required('Tidak Boleh Kosong'),
        filename: Yup.string().required('Tidak Boleh Kosong'),
        image_base64: Yup.string().required('Tidak Boleh Kosong'),
        receipt: Yup.string().required('Tidak Boleh Kosong'),
    });

    const formik = useFormik({
        initialValues: {
            transactionId: '',
            total_purchase: '',
            // receipt: '',
            filename: '',
            image_base64: '',
            email: customerData.email,
        },
        validationSchema,
        // onSubmit: async (values, {resetForm} ) => {
        //   window.backdropLoader(true);
        //   // console.log(values,'v')
        //   await postOfflineTransaction({
        //     variables: {
        //       ...values,
        //       customer: {
        //         email: values.email,
        //       },
        //       receipt: values.image_base64,
        //       total_purchase:values.total_purchase,
        //       transaction_id: values.transactionId
        //     },
        //   }).then(() => {
        //       window.backdropLoader(true);
        //       window.toastMessage({
        //           open: true,
        //           text: 'text message',
        //           variant: 'success',
        //       });
        //       console.log(values.email, "e")
        //       resetForm({});
        //   }).catch((e) => {
        //       window.backdropLoader(true);
        //       window.toastMessage({
        //           open: true,
        //           text: e.message.split(':')[1] || 'gagal',
        //           variant: 'error',
        //       });
        //       console.log(values.email, "error")

        //   });
        // },
        onSubmit: () => {
            // eslint-disable-next-line no-console
            console.log('values');
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
