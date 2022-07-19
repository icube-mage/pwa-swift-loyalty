/* eslint-disable react/no-unescaped-entities */
import Account from '@core_modules/customer/pages/account/components/Customer/view/desktop/account';
import Address from '@core_modules/customer/pages/account/components/Customer/view/desktop/address';
import useStyles from '@core_modules/customer/pages/account/components/Customer/style';

const ViewDesktop = (props) => {
    const {
        t, userData, storeConfig,
    } = props;
    const { customer } = userData;
    const styles = useStyles();
    return (
        <div className="hidden-mobile">
            <div className={styles.desktopContainer}>
                <Account customer={customer} styles={styles} t={t} storeConfig={storeConfig} />
                <Address customer={customer} styles={styles} t={t} storeConfig={storeConfig} />
            </div>
        </div>
    );
};

export default ViewDesktop;
