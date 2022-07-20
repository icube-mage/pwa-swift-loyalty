// /* eslint-disable no-plusplus */
// /* eslint-disable radix */
// /* eslint-disable no-use-before-define */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable no-shadow */
// /* eslint-disable eqeqeq */
// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
// Library
import Layout from '@layout_customer';
import useStyles from '@core_modules/customer/pages/address/components/style';
import classNames from 'classnames';
import TextField from '@common_textfield';
import Button from '@common_button';
import { breakPointsUp } from '@helper_theme';
import DropFile from '@core_modules/commons/DropFile/index';
import TableOfflineTransaction from '@core_modules/customer/pages/offlinetransaction/components/table';

// Main Render Page
const Content = (props) => {
    // style
    const styles = useStyles();
    const {
        loading, dataOfflineTransaction, formik, handleDropFile, t,
    } = props;
    const desktop = breakPointsUp('sm');
    return (
        <Layout {...props}>
            <div className={styles.container}>
                <form className={classNames('col-md-3', styles.container)} onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        error={
                            !!(formik.touched.email && formik.errors.email)
                        }
                        errorMessage={
                            (formik.touched.email && formik.errors.email)
                      || null
                        }
                    />
                    <TextField
                        label="Order Transaction ID"
                        name="transactionId"
                        value={formik.values.transactionId}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.transactionId && formik.errors.transactionId)
                        }
                        errorMessage={
                            (formik.touched.transactionId && formik.errors.transactionId)
                        || null
                        }
                    />
                    <TextField
                        label="Total Purchase"
                        name="total_purchase"
                        value={formik.values.total_purchase}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.total_purchase && formik.errors.total_purchase)
                        }
                        errorMessage={
                            (formik.touched.total_purchase && formik.errors.total_purchase) || null
                        }
                    />
                    <DropFile
                        title="Upload File"
                        acceptedFile=".jpg,.jpeg,.png,.pdf,.gif"
                        multiple={false}
                        error={(
                            (formik.errors.filename && formik.touched.filename)
                    || (formik.errors.image_base64 && formik.touched.image_base64)
                        )}
                        getBase64={handleDropFile}
                    />
                    <div className={styles.bottomButtons}>
                        <Button
                            fullWidth={!desktop}
                            type="submit"
                            // loading={loading}
                            align={desktop ? 'left' : 'center'}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
                <TableOfflineTransaction
                    t={t}
                    loading={loading}
                    dataOfflineTransaction={dataOfflineTransaction}
                />
            </div>
        </Layout>
    );
};

export default Content;
