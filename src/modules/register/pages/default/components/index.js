import Button from '@common_button';
import PasswordField from '@common_password';
import Select from '@common_select';
import TextField from '@common_textfield';
import Typography from '@common_typography';
import useStyles from '@core_modules/register/pages/default/components/style';
import DateDayJs from '@date-io/dayjs';
import { breakPointsUp } from '@helper_theme';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import OtpBlock from '@plugin_otp';
import classNames from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';

const RegisterView = ({
    t,
    formik,
    enableOtp,
    setdisabled,
    handleChangePhone,
    handleWa,
    handleChangeDate,
    phoneIsWa,
    enableRecaptcha,
    sitekey,
    handleChangeCaptcha,
    disabled,
    recaptchaRef,
    gender,
    dob,
}) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');

    return (
        <>
            <form className={classNames('col-md-6', styles.container)} onSubmit={formik.handleSubmit}>
                <TextField
                    label={t('common:form:firstName')}
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.firstname && formik.errors.firstname)}
                    errorMessage={(formik.touched.firstname && formik.errors.firstname) || null}
                />
                <TextField
                    label={t('common:form:lastName')}
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.lastname && formik.errors.lastname)}
                    errorMessage={(formik.touched.lastname && formik.errors.lastname) || null}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.email && formik.errors.email)}
                    errorMessage={(formik.touched.email && formik.errors.email) || null}
                />
                {gender && (
                    <Select
                        className="genderField"
                        options={[{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }]}
                        label={t('common:form:gender')}
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        helperText={t('common:form:select')}
                        error={!!(formik.touched.gender && formik.errors.gender)}
                        errorMessage={(formik.touched.gender && formik.errors.gender) || null}
                    />
                )}
                {dob && (
                    <DatePicker
                        fullWidth
                        label={t('common:form:dob')}
                        name="dob"
                        value={formik.values.dob}
                        onChange={handleChangeDate}
                        error={!!(formik.touched.dob && formik.errors.dob)}
                        helperText={(formik.touched.dob && formik.errors.dob) || null}
                    />
                )}
                <PasswordField
                    label="Password"
                    showVisible
                    showPasswordMeter
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.password && formik.errors.password)}
                    errorMessage={(formik.touched.password && formik.errors.password) || null}
                />
                <TextField
                    label={t('common:form:confirm')}
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    errorMessage={(formik.touched.confirmPassword && formik.errors.confirmPassword) || null}
                />
                {enableOtp ? (
                    <>
                        <OtpBlock
                            type="register"
                            setDisabled={setdisabled}
                            phoneProps={{
                                name: 'phonenumber',
                                value: formik.values.phonenumber,
                                onChange: handleChangePhone,
                                error: !!(formik.errors.phonenumber && formik.touched.phonenumber),
                                errorMessage: (formik.touched.phonenumber && formik.errors.phonenumber) || null,
                            }}
                            codeProps={{
                                name: 'otp',
                                value: formik.values.otp,
                                onChange: formik.handleChange,
                                error: !!(formik.touched.otp && formik.errors.otp),
                                errorMessage: (formik.touched.otp && formik.errors.otp) || null,
                                footer: (
                                    <FormControlLabel
                                        onChange={handleWa}
                                        className={styles.checkWa}
                                        control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                                        label={<Typography variant="p">{t('register:isWhatsapp')}</Typography>}
                                    />
                                ),
                            }}
                        />
                        {!phoneIsWa && (
                            <TextField
                                label={`${t('common:form:phoneNumber')} Whatsapp`}
                                name="whatsapp_number"
                                value={formik.values.whatsapp_number}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.whatsapp_number && formik.errors.whatsapp_number)}
                                errorMessage={(formik.touched.whatsapp_number && formik.errors.whatsapp_number) || null}
                            />
                        )}
                    </>
                )
                    : (
                        <>
                            <TextField
                                label={t('common:form:phoneNumber')}
                                name="phonenumber"
                                value={formik.values.phonenumber}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.phonenumber && formik.errors.phonenumber)}
                                errorMessage={(formik.touched.phonenumber && formik.errors.phonenumber) || null}
                            />
                            <FormControlLabel
                                onChange={handleWa}
                                className={styles.checkWa}
                                control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                                label={<Typography variant="p">{t('register:isWhatsapp')}</Typography>}
                            />
                            {!phoneIsWa && (
                                <TextField
                                    label={`${t('common:form:phoneNumber')} Whatsapp`}
                                    name="whatsapp_number"
                                    value={formik.values.whatsapp_number}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.whatsapp_number && formik.errors.whatsapp_number)}
                                    errorMessage={(formik.touched.whatsapp_number && formik.errors.whatsapp_number) || null}
                                />
                            )}
                        </>
                    )}
                <div className={styles.footer}>
                    <FormControlLabel
                        value={formik.values.subscribe}
                        onChange={formik.handleChange}
                        name="subscribe"
                        control={<Checkbox name="subscribe" color="primary" size="small" />}
                        label={(
                            <Typography variant="p" letter="capitalize" className="row center">
                                {t('register:subscribe')}
                            </Typography>
                        )}
                        style={{ marginBottom: enableRecaptcha ? 25 : 0 }}
                    />

                    {
                        enableRecaptcha ? (
                            <>
                                <ReCAPTCHA
                                    sitekey={sitekey}
                                    onChange={handleChangeCaptcha}
                                    ref={recaptchaRef}
                                />
                                { formik.errors.captcha && (
                                    <Typography color="red">{formik.errors.captcha}</Typography>
                                )}
                            </>
                        ) : null
                    }
                    <Button
                        disabled={disabled}
                        fullWidth={!desktop}
                        className={styles.btnSigin}
                        type="submit"
                        align={desktop ? 'left' : 'center'}
                    >
                        <Typography variant="span" type="bold" letter="uppercase" color="white">
                            {t('register:button')}
                        </Typography>
                    </Button>
                </div>
            </form>
        </>
    );
};

const RegisterViewProvider = (props) => (
    <MuiPickersUtilsProvider utils={DateDayJs}>
        <RegisterView {...props} />
    </MuiPickersUtilsProvider>
);

export default RegisterViewProvider;
