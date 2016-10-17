import React, { Component } from 'react';

class SvgIcon extends Component {

    constructor(props) {
        super(props);
    }

    renderSvg() {
        switch (this.props.Icon) {
            case 'close':
                return this.close();
            case 'phone':
                return this.phone();
            default:
                return null;
        }
    }

    close() {
        return (
            <svg className={this.props.className} width="17px" height="17px" viewBox="0 0 17 17">
                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Mobile/Dialogs/Header" transform="translate(-338.000000, -20.000000)" fill="#F10C29">
                        <g id="Shape">
                            <polygon points="355 21.7 353.3 20 346.5 26.8 339.7 20 338 21.7 344.8 28.5 338 35.3 339.7 37 346.5 30.2 353.3 37 355 35.3 348.2 28.5"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }

    phone() {
        return (
            <svg width="10px" height="17px" viewBox="0 0 10 17">
                <g id="Ajanvaraus-Desktop" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="AV---Dialogi---Etävastaanotto-varauksen-tiedot---Desktop" transform="translate(-60.000000, -229.000000)" fill="#F10C29">
                        <g id="Group-19" transform="translate(60.000000, 229.000000)">
                            <path d="M8.33666667,0 L1.66333333,0 C0.745,0 0,0.7599 0,1.6966 L0,15.30255 C0,16.2401 0.745,17 1.66333333,17 L8.33583333,17 C9.255,17 10,16.2401 10,15.3034 L10,1.6966 C10,0.7599 9.255,0 8.33666667,0 L8.33666667,0 Z M5,16.15 C4.425,16.15 3.95833333,15.77005 3.95833333,15.3 C3.95833333,14.82995 4.425,14.45 5,14.45 C5.575,14.45 6.04166667,14.82995 6.04166667,15.3 C6.04166667,15.77005 5.575,16.15 5,16.15 L5,16.15 Z M8.33333333,13.6 L1.66666667,13.6 L1.66666667,1.7 L8.33333333,1.7 L8.33333333,13.6 L8.33333333,13.6 Z" id="Shape-Copy"></path>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }

    render() {
        return (
            <div className="svg-icon">
                { this.renderSvg() }
            </div>
        );
    }
};

export default SvgIcon;
