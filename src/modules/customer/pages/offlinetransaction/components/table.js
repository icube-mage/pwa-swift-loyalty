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
import useStyles from '@core_modules/customer/pages/address/components/style';
import { SkeletonTable } from '@core_modules/customer/pages/address/components/skeleton';

// Main Render Page
const TableOfflineTransaction = (props) => {
    // style
    const styles = useStyles();
    const {
        loading, dataOfflineTransaction,
    } = props;
    return (
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
                                        <TableCell align="left">
                                            <img
                                                src={item.receipt}
                                                // className={styles.itemImg}
                                                alt={item.transactionId}
                                                width="100px"
                                                height="100px"
                                                quality={80}
                                            />
                                        </TableCell>
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
    );
};

export default TableOfflineTransaction;
