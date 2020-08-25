/* eslint-disable no-nested-ternary */
import TextField from '@common_forms/TextField';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { features } from '@config';
import Router from 'next/router';
import React, { useState } from 'react';
import CategoryWrapper from './CategoryWrapper';
import VesMenuWrapper from './VesMenuWrapper';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const SearchPage = (props) => {
    const styles = useStyles();
    const [openedCategory, setOpenedCategory] = useState([]);
    const [showCat, setShowCat] = useState(true);
    const [showSubCat, setShowSubCat] = useState(false);
    const [slideCat, setSlideCat] = useState(false);
    const [value, setValue] = React.useState('');
    const { open } = props;
    const vesMenu = features.vesMenu.enabled;

    const openSub = (cat) => {
        setOpenedCategory([cat]);
        setShowSubCat(true);
        setShowCat(false);
    };

    const closeSub = () => {
        setOpenedCategory([]);
        setShowSubCat(false);
        setShowCat(true);
        setSlideCat(true);
    };

    const handleCloseModal = () => {
        closeSub();
        setSlideCat(false);
        props.setOpenModal(false);
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            handleCloseModal();
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            handleCloseModal();
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
            >
                <div className={styles.container}>
                    <AppBar className={styles.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleCloseModal}
                                aria-label="close"
                            >
                                <ArrowBack className={styles.iconClose} />
                            </IconButton>
                            <TextField
                                placeholder="Search ..."
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyPress={(e) => handleSearch(e)}
                            />
                            <IconButton
                                disabled={value === ''}
                                edge="start"
                                onClick={searchByClick}
                                aria-label="close"
                            >
                                <SearchIcon className={styles.iconClose} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {open ? vesMenu ? (
                        <VesMenuWrapper />
                    ) : (
                        <CategoryWrapper
                            {...props}
                            openedCategory={openedCategory}
                            showCat={showCat}
                            openSub={openSub}
                            slideCat={slideCat}
                            showSubCat={showSubCat}
                            closeSub={closeSub}
                        />
                    ) : null}
                </div>
            </Dialog>
        </>
    );
};

export default SearchPage;
