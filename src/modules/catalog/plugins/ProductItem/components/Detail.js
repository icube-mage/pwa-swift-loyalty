/* eslint-disable jsx-a11y/anchor-is-valid */
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';
import Link from '@material-ui/core/Link';
import React from 'react';
import useStyles from '@plugin_productitem/style';

const Detail = (props) => {
    const {
        spesificProduct,
        handleClick,
        name,
        __typename,
        price_range,
        price_tiers,
        special_from_date,
        special_to_date,
        enablePrice = true,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.descItem}>
            <Link onClick={handleClick} className={styles.productLinkButton}>
                <Typography variant="p" className={styles.productTitle} letter="capitalize">
                    {name}
                </Typography>
            </Link>
            {enablePrice && (
                <PriceFormat
                    // eslint-disable-next-line camelcase
                    priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                    // eslint-disable-next-line camelcase
                    priceTiers={spesificProduct.price_tiers ? spesificProduct.price_tiers : price_tiers}
                    productType={__typename}
                    specialFromDate={special_from_date}
                    specialToDate={special_to_date}
                />
            )}
        </div>
    );
};

export default Detail;
