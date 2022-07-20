/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React, { useEffect, useState, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import {
    custDataNameCookie, features, assetsVersion, storeConfigNameCookie,
} from '@config';
import { getHost } from '@helper_config';
import { breakPointsUp } from '@helper_theme';
import { setCookies, getCookies } from '@helper_cookies';
import { setLocalStorage } from '@helper_localstorage';
import { getAppEnv } from '@helpers/env';
import useStyles from '@core_modules/theme/layout/style';
// import { createCompareList } from '@core_modules/product/services/graphql';

import PopupInstallAppMobile from '@core_modules/theme/components/custom-install-popup/mobile';
// import Copyright from '@core_modules/theme/components/footer/desktop/components/copyright';
import { localTotalCart } from '@services/graphql/schema/local';
import { getCountCart } from '@core_modules/theme/services/graphql';
import { getCartId } from '@helper_cartid';

const GlobalPromoMessage = dynamic(() => import('@core_modules/theme/components/globalPromo'), { ssr: false });
const BottomNavigation = dynamic(() => import('@common_bottomnavigation'), { ssr: false });
const HeaderMobile = dynamic(() => import('@common_headermobile'), { ssr: false });
const HeaderDesktop = dynamic(() => import('@common_headerdesktop'), { ssr: true });
const Message = dynamic(() => import('@common_toast'), { ssr: false });
const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const ScrollToTop = dynamic(() => import('@common_scrolltotop'), { ssr: false });
const RestrictionPopup = dynamic(() => import('@common_restrictionPopup'), { ssr: false });
const RecentlyViewed = dynamic(() => import('@core_modules/theme/components/recentlyViewed'), { ssr: false });

const Layout = (props) => {
    const bodyStyles = useStyles();
    const {
        dataVesMenu,
        pageConfig,
        children,
        app_cookies,
        CustomHeader = false,
        i18n,
        storeConfig = {},
        isLogin,
        headerProps = {},
        t,
        onlyCms,
        withLayoutHeader = true,
        withLayoutFooter = true,
        showRecentlyBar = true,
    } = props;
    const {
        ogContent = {}, schemaOrg = null, headerDesktop = true, footer = true,
    } = pageConfig;
    const router = useRouter();
    const appEnv = getAppEnv();
    const [state, setState] = useState({
        toastMessage: {
            open: false,
            variant: 'success',
            text: '',
        },
        backdropLoader: false,
    });
    const [restrictionCookies, setRestrictionCookies] = useState(false);
    const [showGlobalPromo, setShowGlobalPromo] = React.useState(false);
    // const [setCompareList] = createCompareList();

    // get app name config

    let appName = '';
    let installMessage = '';
    let showPopup = false;
    let iconAppleTouch = '/assets/img/swiftpwa_apple_touch.png';
    if (storeConfig && storeConfig.pwa) {
        iconAppleTouch = storeConfig.pwa.icon_apple_touch;
        appName = storeConfig.pwa.app_name;
        showPopup = storeConfig.pwa.custom_install_app_enable;
        installMessage = storeConfig.pwa.install_message || 'Install';
    }

    // const [mainMinimumHeight, setMainMinimumHeight] = useState(0);
    const refFooter = useRef(null);
    const refHeader = useRef(null);
    const client = useApolloClient();

    const handleSetToast = (message) => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                ...message,
            },
        });
    };

    const handleLoader = (status = false) => {
        setState({
            ...state,
            backdropLoader: status,
        });
    };

    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };

    const handleRestrictionCookies = () => {
        setRestrictionCookies(true);
        setCookies('user_allowed_save_cookie', true);
    };

    const handleClosePromo = () => {
        setShowGlobalPromo(false);
    };

    const ogData = {
        'og:title': pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa',
        'og:image': storeConfig.header_logo_src
            ? `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`
            : `${getHost()}/assets/img/swift-logo.png`,
        'og:image:type': 'image/png',
        'og:url': `${getHost()}${router.asPath}`,
        'og:locale': i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        'og:type': 'website',
        ...ogContent,
    };

    if (!ogData['og:description']) {
        ogData['og:description'] = storeConfig.default_description || '';
    }

    if (storeConfig && storeConfig.pwa && storeConfig.pwa.facebook_meta_id_app_id) {
        ogData['fb:app_id'] = storeConfig.pwa.facebook_meta_id_app_id;
    }

    // React.useEffect(() => {
    //     if (!isLogin && modules.productcompare.enabled) {
    //         const uid_product = getCookies('uid_product_compare');
    //         if (!uid_product) {
    //             setCompareList({
    //                 variables: {
    //                     uid: [],
    //                 },
    //             })
    //                 .then(async (res) => {
    //                     setCookies('uid_product_compare', res.data.createCompareList.uid);
    //                 })
    //                 .catch((e) => {
    //                     window.toastMessage({
    //                         open: true,
    //                         variant: 'error',
    //                         text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
    //                     });
    //                 });
    //         }
    //     }
    // }, [isLogin]);

    const reloadCartQty = typeof window !== 'undefined' && window && window.reloadCartQty;
    let cartId = '';
    const [getCart, RespondCart] = getCountCart();
    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    useEffect(() => {
        if (RespondCart && RespondCart.data) {
            client.writeQuery({
                query: localTotalCart,
                data: { totalCart: RespondCart.data.cart.total_quantity },
            });
        }
    }, [RespondCart]);

    useEffect(() => {
        if (reloadCartQty && cartId) {
            // query get cart
            getCart({
                variables: {
                    cartId,
                },
            });
            window.reloadCartQty = false;
        }
    }, [reloadCartQty]);

    useEffect(() => {
        const isRestrictionMode = getCookies('user_allowed_save_cookie');
        if (isRestrictionMode) {
            setRestrictionCookies(isRestrictionMode);
        }
        if (typeof window !== 'undefined') {
            window.toastMessage = handleSetToast;
            window.backdropLoader = handleLoader;
            const custData = Cookies.getJSON(custDataNameCookie);
            const enablePromo = getCookies(features.globalPromo.key_cookies);
            const tagManagerArgs = {
                dataLayer: {
                    pageName: pageConfig.title,
                    customerGroup: isLogin === 1 ? 'GENERAL' : 'NOT LOGGED IN',
                },
            };
            if (custData && custData.email) tagManagerArgs.dataLayer.customerId = custData.email;
            TagManager.dataLayer(tagManagerArgs);
            if (enablePromo !== '' && storeConfig.global_promo && storeConfig.global_promo.enable) {
                setShowGlobalPromo(enablePromo);
            } else if (storeConfig.global_promo && storeConfig.global_promo.enable) {
                setShowGlobalPromo(true);
            }
        }
        // setMainMinimumHeight(refFooter.current.clientHeight + refHeader.current.clientHeight);
    }, []);

    const desktop = breakPointsUp('sm');

    const styles = {
        marginBottom: pageConfig.bottomNav ? '60px' : 0,
    };

    if (!headerDesktop) {
        styles.marginTop = 0;
    }

    if (typeof window !== 'undefined' && storeConfig) {
        setLocalStorage(storeConfigNameCookie, storeConfig);
    }

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content={pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}
                />
                <meta name="robots" content={appEnv === 'prod' && storeConfig.pwa ? storeConfig.pwa.default_robot : 'NOINDEX,NOFOLLOW'} />
                <link rel="apple-touch-icon" href={iconAppleTouch} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="description" content={ogData['og:description']} />
                {Object.keys(ogData).map((key, idx) => {
                    if (typeof ogData[key] === 'object' && ogData[key].type && ogData[key].type === 'meta') {
                        return <meta name={`${key}`} content={ogData[key].value} key={idx} />;
                    }
                    return <meta property={`${key}`} content={ogData[key]} key={idx} />;
                })}
                <title>{pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}</title>
                {schemaOrg
                    ? schemaOrg.map((val, idx) => (
                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(val) }} key={idx} />
                    ))
                    : null}
                {
                    showPopup && <script src={`/static/firebase/install.${assetsVersion}.js`} defer />
                }
            </Head>
            {showPopup ? <PopupInstallAppMobile appName={appName} installMessage={installMessage} /> : null}
            {withLayoutHeader && (
                <header ref={refHeader}>
                    { typeof window !== 'undefined'
                        && storeConfig.global_promo && storeConfig.global_promo.enable
                        && (
                            <GlobalPromoMessage
                                t={t}
                                storeConfig={storeConfig}
                                showGlobalPromo={showGlobalPromo}
                                handleClose={handleClosePromo}
                                appName={appName}
                                installMessage={installMessage}
                            />
                        )}
                    <div className="hidden-mobile">
                        {headerDesktop
                            ? (
                                <HeaderDesktop
                                    storeConfig={storeConfig}
                                    isLogin={isLogin}
                                    t={t}
                                    app_cookies={app_cookies}
                                    showGlobalPromo={showGlobalPromo}
                                    enablePopupInstallation={showPopup}
                                    appName={appName}
                                    installMessage={installMessage}
                                    dataVesMenu={dataVesMenu}
                                />
                            )
                            : null}
                    </div>
                    <div className="hidden-desktop">
                        {React.isValidElement(CustomHeader) ? (
                            <>{React.cloneElement(CustomHeader, { pageConfig, ...headerProps })}</>
                        ) : (
                            <HeaderMobile {...headerProps} pageConfig={pageConfig} />
                        )}
                    </div>
                </header>
            )}

            <main style={{ ...styles }} className={!onlyCms ? 'main-app' : 'main-app main-app-cms'} id="maincontent">
                <Loading open={state.backdropLoader} />
                <Message
                    open={state.toastMessage.open}
                    variant={state.toastMessage.variant}
                    setOpen={handleCloseMessage}
                    message={state.toastMessage.text}
                />
                {children}
                {desktop ? <ScrollToTop {...props} /> : null}
            </main>
            {withLayoutFooter && (
                <footer className={bodyStyles.footerContainer} ref={refFooter}>
                    {/* <div className="hidden-mobile">
                        <Copyright storeConfig={storeConfig} />
                    </div> */}
                    {desktop ? null : <BottomNavigation active={pageConfig.bottomNav} storeConfig={storeConfig} />}
                </footer>
            )}
            {
                storeConfig.cookie_restriction && !restrictionCookies
                && (
                    <RestrictionPopup
                        handleRestrictionCookies={handleRestrictionCookies}
                        restrictionStyle={bodyStyles.cookieRestriction}
                    />
                )
            }
            {
                showRecentlyBar && !onlyCms && (
                    <RecentlyViewed
                        isActive={storeConfig && storeConfig.weltpixel_RecentlyViewedBar_general_enable}
                        recentlyBtn={bodyStyles.recentView}
                        wrapperContent={bodyStyles.recentlyWrapperContent}
                        recentlyBtnContent={bodyStyles.recentlyBtnContent}
                        contentFeatured={bodyStyles.contentFeatured}
                        className={bodyStyles.itemProduct}
                    />
                )
            }
        </>
    );
};

export default Layout;
