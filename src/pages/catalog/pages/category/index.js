import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import PropTypes from 'prop-types';
import { StripHtmlTags } from '@helpers/text';
import Component from './components';
import { getCategory } from './services';
import SkeletonCategory from './components/Skeleton';

const Page = (props) => {
    const { categoryId } = props;
    const { loading, data } = getCategory({
        productSize: 20,
        id: categoryId,
    });
    const ogContent = {};
    if (data && data.categoryList[0].description) {
        ogContent.description = StripHtmlTags(data.categoryList[0].description);
    }
    const pageConfig = {
        title: loading ? '' : data.categoryList[0].name,
        headerTitle: data && !data.categoryList[0].image_path ? data.categoryList[0].name : '',
        header: data && data.categoryList[0].image_path ? 'absolute' : 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: 'browse',
        pageType: 'category',
        ogContent,
    };
    return (
        <Layout {...props} pageConfig={pageConfig}>
            {loading ? <SkeletonCategory /> : <Component {...props} data={data} />}
        </Layout>
    );
};

Page.propTypes = {
    categoryId: PropTypes.number.isRequired,
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'category'],
});

export default withTranslation()(Page);
