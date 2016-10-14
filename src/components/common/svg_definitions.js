import React, { Component } from 'react';

class SvgIcon extends Component {

    constructor(props) {
        super(props);
    }

    renderSvg() {
        switch (this.props.Icon) {
            case 'close':
                return this.close();
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

    render() {
        return (
            <div>
                { this.renderSvg() }
            </div>
        );
    }
};

export default SvgIcon;
