/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import Link from 'next/link';
import noReload from '@helper_noreload';
import { setResolver, getResolver } from '@helper_localstorage';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCookies } from '@helper_cookies';
import { removeCartId } from '@helper_cartid';
import Router, { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { localTotalCart, localCompare } from '@services/graphql/schema/local';
import Typography from '@common_typography';
import PointCard from '@plugin_rewardpointinfo';
import Badge from '@material-ui/core/Badge';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Button from '@common_button';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import useStyles from '@core_modules/customer/pages/account/components/Customer/style';
import { removeToken as deleteToken } from '@core_modules/customer/services/graphql';

// eslint-disable-next-line consistent-return
const ViewMobile = (props) => {
    const {
        userData, t, menu, totalUnread, modules,
    } = props;
    const router = useRouter();
    const linkAction = async (type, link) => {
        if (type === 'cms') {
            const urlResolver = getResolver();
            urlResolver[link] = {
                type: 'CMS_PAGE',
            };
            await setResolver(urlResolver);
            router.push('/[...slug]', link);
        } else {
            router.push('/[...slug]', link);
        }
    };
    const client = useApolloClient();
    const [deleteTokenGql] = deleteToken();
    const handleLogout = () => {
        deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                Router.push('/customer/account/login');
            })
            .catch(() => {
                //
            });
    };
    const styles = useStyles();
    const StyledBadge = withStyles(() => ({
        badge: {
            right: -4,
            top: 4,
        },
    }))(Badge);
    React.useEffect(() => {
        noReload({
            action: linkAction,
        });
    }, [router.asPath]);

    return (
        <div className={classNames(styles.root, 'hidden-desktop')}>
            <div className={styles.account_wrapper}>
                <div className={[styles.account_block, styles.padding_vertical_40, styles.border_bottom].join(' ')}>
                    <h3 className={styles.account_username}>
                        {userData && userData.customer && `${userData.customer.firstname} ${userData.customer.lastname}`}
                    </h3>
                    <p className={styles.account_email}>{userData && userData.customer && userData.customer.email}</p>
                </div>
                <div className={[styles.account_block, styles.padding_vertical_40].join(' ')}>
                    {modules.rewardpoint.enabled ? <PointCard {...props} /> : null}
                    <div className={styles.account_block}>
                        <ul className={styles.account_navigation}>
                            {menu.map(({ href, title }, index) => (
                                <li className={styles.account_navigation_item} key={index}>
                                    <Link href={href}>
                                        <a className={styles.account_navigation_link}>
                                            <StyledBadge
                                                color="secondary"
                                                max={99}
                                                invisible={!href.includes('notification') || !totalUnread}
                                                badgeContent={totalUnread}
                                            >
                                                {title}
                                            </StyledBadge>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <ul className={styles.account_navigation}>
                    {modules.setting.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Button fullWidth variant="outlined" href="/setting">
                                <Typography variant="span" type="bold" letter="uppercase">
                                    {t('common:setting:title')}
                                </Typography>
                            </Button>
                        </li>
                    ) : null}

                    <li className={styles.account_navigation_item}>
                        <Button fullWidth className={styles.logoutBtn} onClick={handleLogout} variant="contained">
                            <Typography className={styles.logOutTxt} color="white" variant="span" type="bold" letter="uppercase">
                                {t('customer:button:logout')}
                            </Typography>
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ViewMobile;
