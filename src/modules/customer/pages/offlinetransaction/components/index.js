import Layout from '@layout_customer';

// Main Render Page
const Content = (props) => {
    const {
        loading, error, dataOfflineTransaction, formik,
    } = props;

    let content = null;
    if (loading) {
        content = 'loading';
    }
    if (dataOfflineTransaction) {
        content = (
            <>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="transactionId"
                        value={formik.values.transactionId}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        name="totalPurchase"
                        value={formik.values.totalPurchase}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="text"
                        name="receipt"
                        value={formik.values.receipt}
                        onChange={formik.handleChange}
                    />
                    <button type="submit">Upload</button>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Transaction Id</th>
                            <th>Total Purchase</th>
                            <th>Receipt</th>
                            <th>Status</th>
                            <th>Transaction Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataOfflineTransaction.map((item) => (
                            <tr>
                                <td>{item.transaction_id}</td>
                                <td>{item.total_purchase}</td>
                                <td>Receipt</td>
                                <td>{item.status}</td>
                                <td>{item.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
    if (error) {
        content = 'error';
    }

    return (
        <Layout {...props}>
            {content}
        </Layout>
    );
};

export default Content;
