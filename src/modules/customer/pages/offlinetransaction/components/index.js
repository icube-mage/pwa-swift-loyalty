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
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import Layout from '@layout_customer';
import useStyles from '@core_modules/customer/pages/address/components/style';
import { SkeletonTable } from '@core_modules/customer/pages/address/components/skeleton';
import classNames from 'classnames';
import TextField from '@common_textfield';
import Button from '@common_button';
import Typography from '@common_typography';
import { breakPointsUp } from '@helper_theme';
import DropFile from '@core_modules/commons/DropFile/index';

// Main Render Page
const Content = (props) => {
    // style
    const styles = useStyles();
    const {
        loading, dataOfflineTransaction, formik, handleDropFile, postOfflineTransaction,
    } = props;
    const desktop = breakPointsUp('sm');
    // console.log(e.)
    return (
        <Layout {...props}>
            <div className={styles.container}>
                <form className={classNames('col-md-6', styles.container)} onSubmit={formik.handleSubmit}>
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
                        // label="Upload File"
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
                            loading={postOfflineTransaction.loading || postOfflineTransaction.loading}
                            align={desktop ? 'left' : 'center'}
                        >
                            <Typography letter="capitalize" color="white" type="bold">
                                Submit
                            </Typography>
                        </Button>
                    </div>
                </form>
                <div className={styles.tableOuterContainer}>
                    <TableContainer component={Paper} className={[styles.tableContainer, 'hidden-mobile'].join(' ')}>
                        <Table className={styles.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">Transaction ID</TableCell>
                                    <TableCell align="left">Total Purchase</TableCell>
                                    <TableCell align="left">Receipt</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Transaction Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <SkeletonTable />
                                ) : dataOfflineTransaction ? (
                                    <>
                                        {dataOfflineTransaction.map((item, index) => (
                                            <TableRow className={styles.tableRowHead} key={index}>
                                                <TableCell align="left">{item.transaction_id}</TableCell>
                                                <TableCell align="left">{item.total_purchase}</TableCell>
                                                <TableCell align="left">Image</TableCell>
                                                <TableCell align="left">{item.status}</TableCell>
                                                <TableCell align="left">{item.created_at}</TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9}>
                                            <Alert severity="warning">No Offline Transaction</Alert>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Layout>
    );
};

export default Content;
