/* eslint-disable no-plusplus */
import { modules } from '@config';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Typography from '@common_typography';
import useStyles from '@layout_customer/style';

const Layout = (props) => {
    const {
        children, t, title, activeMenu,
    } = props;
    const pushIf = (condition, ...elements) => (condition ? elements : []);
    const styles = useStyles();
    const router = useRouter();
    let titlePage = '';

    const menu = [
        { href: '/customer/account', title: t('customer:menu:myAccount') },
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/sales/transaction/history', title: 'Offline transaction' },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        { href: '/customer/account/profile', title: t('customer:menu:accountInformation') },
        ...pushIf(modules.rewardpoint.enabled, {
            href: '/aw_rewardpoints/info',
            title: t('customer:menu:rewardPoint'),
        }),
    ];
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        if (item.href === router.asPath) {
            titlePage = item.title;
        }
    }
    return (
        <div className="row">
            <div className="col-md-2 col-xs-12 hidden-mobile">
                <div className={styles.listMenuContainer}>
                    <ul className={styles.listMenu}>
                        {menu.map((val, idx) => (
                            <li
                                key={idx}
                                className={
                                    router.asPath === val.href || val.href === activeMenu
                                        ? classNames(styles.listMenuItem, styles.listMenuItemActive)
                                        : styles.listMenuItem
                                }
                            >
                                <Link href={val.href}>
                                    <a>{val.title}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-md-10 col-xs-12 col-sm-12">
                <Typography variant="h4" type="bold" letter="capitalize" className={classNames('hidden-mobile', styles.titleContent)}>
                    {title || titlePage}
                </Typography>
                {children}
            </div>
        </div>
    );
};

export default Layout;
