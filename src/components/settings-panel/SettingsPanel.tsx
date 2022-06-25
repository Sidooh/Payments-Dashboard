import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, ButtonGroup, Col, Form, Offcanvas, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import SoftBadge from 'components/common/SoftBadge';
import { IMAGES } from 'constants/images';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { resetTheme, setTheme } from 'features/theme/themeSlice';
import { CONFIG } from 'config';
import { faPalette, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

const SettingsPanel = () => {
    const {
        showSettingPanel,
        navbarStyle,
        navbarPosition,
        isDark,
        isFluid
    } = useAppSelector((state: RootState) => state.theme);

    const dispatch = useAppDispatch();

    const [navbars] = useState([
        {
            name : 'transparent',
            image: IMAGES.generic.default
        },
        {
            name : 'inverted',
            image: IMAGES.generic.inverted
        },
        {
            name : 'card',
            image: IMAGES.generic.card
        },
        {
            name : 'vibrant',
            image: IMAGES.generic.vibrant
        }
    ]);

    const setConfig = (key: string, value: string | boolean) => dispatch(setTheme({key, value}));

    return (
        <Offcanvas
            show={showSettingPanel}
            onHide={() => dispatch(setTheme({key: 'showSettingPanel', value: false}))}
            placement="end"
            style={{maxWidth: '22rem'}}
            className="border-0"
        >
            <Offcanvas.Header closeVariant="white" className="bg-shape settings-panel-header"
                              style={{minHeight: '4.3125rem'}}>
                <Offcanvas.Title as="div" className="py-1 z-index-1 light">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h5 className="text-white">
                            <FontAwesomeIcon icon={faPalette} className="me-2 fs-0"/>
                            Settings
                        </h5>
                        <Button variant="primary" size="sm" className="rounded-pill mt-0 mb-0"
                                style={{fontSize: '12px'}} onClick={() => dispatch(resetTheme())}>
                            <FontAwesomeIcon icon={faRedoAlt} style={{fontSize: '10px'}} className="me-1"/>
                            Reset
                        </Button>
                    </div>
                    <p className="mb-0 fs--1 text-white opacity-75">Set your own customized style</p>
                </Offcanvas.Title>
                <button className="btn-close btn-close-white z-index-1 mt-0" type="button"
                        onClick={() => setConfig('showSettingPanel', false)}/>
            </Offcanvas.Header>

            <Offcanvas.Body className="scrollbar">
                <h5 className="fs-0">Color Scheme</h5>
                <p className="fs--1">Choose the perfect color mode for your app.</p>

                <ButtonGroup className="d-block w-100 btn-group-navbar-style">
                    <Row className={'gx-2'}>
                        <Col xs={6}>
                            <input className="btn-check" id="themeSwitcherLight" name="theme-color" type="radio"
                                   value="light" data-theme-control="theme" checked={!isDark}
                                   onChange={({target}) => setConfig('isDark', !target.checked)}
                            />
                            <label className="btn d-inline-block btn-navbar-style fs--1" htmlFor="themeSwitcherLight">
                                    <span className="hover-overlay mb-2 rounded d-block">
                                        <img className="img-fluid img-prototype mb-0"
                                             src={IMAGES.generic.falconModeDefault} alt=""/>
                                    </span>
                                <span className="label-text">Light</span>
                            </label>
                        </Col>
                        <Col xs={6}>
                            <input className="btn-check" id="themeSwitcherDark" name="theme-color" type="radio"
                                   value="dark" data-theme-control="theme" checked={isDark}
                                   onChange={({target}) => setConfig('isDark', target.checked)}
                            />
                            <label className="btn d-inline-block btn-navbar-style fs--1" htmlFor="themeSwitcherDark">
                                    <span className="hover-overlay mb-2 rounded d-block">
                                        <img className="img-fluid img-prototype mb-0"
                                             src={IMAGES.generic.falconModeDark} alt=""/>
                                    </span>
                                <span className="label-text"> Dark</span>
                            </label>
                        </Col>
                    </Row>
                </ButtonGroup>

                <hr/>

                <Flex justifyContent="between">
                    <img src={IMAGES.icons.arrowsH} alt="" width={20} className="me-2 h-100"/>
                    <div className="flex-1">
                        <h5 className="fs-0">Fluid Layout</h5>
                        <p className="fs--1 mb-0">Toggle container layout system</p>
                    </div>
                    <Form.Check
                        type="switch"
                        id="fluid-mode-switch"
                        checked={isFluid}
                        onChange={({target}) => setConfig('isFluid', target.checked)}
                    />
                </Flex>
                <hr/>

                <Flex>
                    <img src={IMAGES.icons.paragraph} alt="" width={20} className="me-2 h-100"/>
                    <div>
                        <Flex alignItems="center" tag="h5" className="fs-0">
                            Navigation Position
                            <SoftBadge bg="success" pill className="fs--2 ms-2">
                                New
                            </SoftBadge>
                        </Flex>
                        <p className="fs--1 mb-2">
                            Select a suitable navigation system for your web application
                        </p>
                        <Form.Check
                            type="radio"
                            id="verticalNav-radio"
                            label="Vertical"
                            name="NavBarPositionRadioButton"
                            checked={navbarPosition === 'vertical'}
                            onChange={() => setConfig('navbarPosition', 'vertical')}
                            inline
                        />
                        <Form.Check
                            type="radio"
                            id="topNav-radio"
                            label="Top"
                            name="NavBarPositionRadioButton"
                            checked={navbarPosition === 'top'}
                            onChange={() => setConfig('navbarPosition', 'top')}
                            inline
                        />
                        <Form.Check
                            type="radio"
                            id="combo-radio"
                            label="Combo"
                            name="NavBarPositionRadioButton"
                            checked={navbarPosition === 'combo'}
                            onChange={() => setConfig('navbarPosition', 'combo')}
                            inline
                        />
                    </div>
                </Flex>

                <hr/>
                <h5 className="fs-0 d-flex align-items-center">
                    Vertical Navbar Style{' '}
                </h5>
                <p className="fs--1">Switch between styles for your vertical navbar</p>
                <ButtonGroup className="d-block w-100 btn-group-navbar-style">
                    <Row className={'gx-2'}>
                        {navbars.slice(0, 2).map(item => (
                            <Col key={item.name} xs={6}>
                                <input className="btn-check" id={`navbar-style-${item.name}`} type="radio"
                                       checked={navbarStyle === item.name}
                                       name="navbarStyle" value={item.name}
                                       onChange={() => setConfig('navbarStyle', item.name)}/>
                                <label className="btn d-block w-100 btn-navbar-style fs--1"
                                       htmlFor={`navbar-style-${item.name}`}>
                                    <img className="img-fluid img-prototype" src={item.image} alt=""/>
                                    <span className="label-text">{item.name.toUpperCase()}</span>
                                </label>
                            </Col>
                        ))}
                    </Row>
                </ButtonGroup>
                <ButtonGroup className="d-block w-100 btn-group-navbar-style">
                    <Row className={'gx-2'}>
                        {navbars.slice(2, 4).map(item => (
                            <Col key={item.name} xs={6}>
                                <input className="btn-check" id={`navbar-style-${item.name}`} type="radio"
                                       checked={navbarStyle === item.name}
                                       name="navbarStyle" value={item.name}
                                       onChange={() => setConfig('navbarStyle', item.name)}/>
                                <label className="btn d-block w-100 btn-navbar-style fs--1"
                                       htmlFor={`navbar-style-${item.name}`}>
                                    <img className="img-fluid img-prototype" src={item.image} alt=""/>
                                    <span className="label-text">{item.name.toUpperCase()}</span>
                                </label>
                            </Col>
                        ))}
                    </Row>
                </ButtonGroup>

                <hr/>

                <div className="text-center mt-5">
                    <img src={IMAGES.logos.sidooh} alt="Sidooh" width={120} className="mb-4"/>
                    <h5>Like What You See?</h5>
                    <p className="fs--1">{CONFIG.sidooh.tagline}</p>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default SettingsPanel;
