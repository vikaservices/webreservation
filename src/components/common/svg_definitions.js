import React, { Component } from 'react';

class SvgDefinitions extends Component {

    constructor(props) {
        super(props);
    }

    renderSvg() {
        switch (this.props.Icon) {
            case 'doctor':
                return this.doctor();
            default:
                return null;
        }
    }

    doctor() {
        return (
            <svg className={this.props.className} width="113px" height="132px" viewBox="0 0 113 132">
                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-1">
                        <feGaussianBlur stdDeviation="10 0" in="SourceGraphic"></feGaussianBlur>
                    </filter>
                    <path d="M0.756410256,49.9466304 C0.756410256,43.8273883 5.598243,37.7648503 11.5838164,36.5040214 C11.5838164,36.5040214 17.867274,34.7948718 23.1611433,34.7948718 C28.1944985,34.7948718 33.9749085,36.4363961 33.9749085,36.4363961 C39.9447893,37.7786504 44.7843339,43.8403469 44.7843339,49.9466304 L44.7843339,116.487179 L0.756410256,116.487179 L0.756410256,49.9466304 Z" id="path-2"></path>
                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-3">
                        <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0.619791667   0 0 0 0 0.619791667   0 0 0 0 0.619791667  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <rect id="path-4" x="8.32051282" y="116.487179" width="9.54451492" height="10.0670901"></rect>
                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-5">
                        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0.53651148   0 0 0 0 0.53651148   0 0 0 0 0.53651148  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <rect id="path-6" x="26.474359" y="116.538579" width="9.54451492" height="10.0670901"></rect>
                    <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-7">
                        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0.53651148   0 0 0 0 0.53651148   0 0 0 0 0.53651148  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                <g id="Ajanvaraus-Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="TT---Dialogi---Työterveysasiakkaan---kirjaudu-Desktop" transform="translate(-431.000000, -116.000000)">
                        <g id="Group-15" transform="translate(458.000000, 116.000000)">
                            <path d="M22.8448698,131.489755 C24.9836723,131.571949 27.2114017,131.615385 29.5,131.615385 C45.7924001,131.615385 59,129.414118 59,126.698718 C59,123.983318 45.7924001,121.782051 29.5,121.782051 C13.2075999,121.782051 0,123.983318 0,126.698718 C0,129.032685 9.75765996,130.986815 22.8448698,131.489755 Z" id="Oval-3" fill="#D8D8D8" opacity="0.261660448" filter="url(#filter-1)"></path>
                            <g id="Group-14" transform="translate(6.051282, 0.000000)">
                                <ellipse id="Oval-100" fill="#52312B" cx="8.77479598" cy="22.3363562" rx="8.77479598" ry="9.12330042"></ellipse>
                                <g id="Rectangle-46">
                                    <use fill="black" fill-opacity="1" filter="url(#filter-3)"></use>
                                    <use fill="#FFFFFF" fill-rule="evenodd"></use>
                                </g>
                                <g id="Rectangle-48-+-Rectangle-48-Copy" transform="translate(16.318042, 40.897554)">
                                    <rect id="Rectangle-48" fill="#F10C29" x="0" y="0" width="13.5470534" height="75.5896259"></rect>
                                    <polygon id="Rectangle-48-Copy" fill="#EABF91" points="0 0 13.5470534 0 13.5470534 12.1546084 6.83199708 21.3874922 0 12.1546084"></polygon>
                                </g>
                                <polygon id="Rectangle-48-Copy-2" fill="#F10C29" points="33.559746 35.549412 33.559746 45.9310987 23.0915684 41.8732362"></polygon>
                                <polygon id="Rectangle-48-Copy-3" fill="#F10C29" transform="translate(16.625929, 40.740255) scale(-1, 1) translate(-16.625929, -40.740255) " points="21.860018 35.549412 21.860018 45.9310987 11.3918404 41.8732362"></polygon>
                                <ellipse id="Oval-100-Copy" fill="#52312B" cx="36.7925656" cy="22.3363562" rx="8.77479598" ry="9.12330042"></ellipse>
                                <path d="M8.94334124,15.4190288 C8.60556618,7.77206878 14.5323518,1.57298283 22.1910755,1.57298283 L23.3762905,1.57298283 C31.0305872,1.57298283 36.9617441,7.77332974 36.6240248,15.4190288 L36.0407243,28.6244905 C35.7029492,36.2714505 29.2260911,42.4705365 21.5628182,42.4705365 L24.0045478,42.4705365 C16.3463961,42.4705365 9.8643611,36.2701895 9.52664174,28.6244905 L8.94334124,15.4190288 Z" id="Rectangle-40" fill="#EABF91"></path>
                                <path d="M36.6383358,20.3643029 L36.9186815,14.1482719 C37.2712751,6.33030931 31.2138518,0 23.3894596,0 L22.1779065,0 C14.3489889,0 8.29627537,6.33439711 8.64868457,14.1482719 L8.97985389,21.4912006 C14.137483,18.7834163 21.2734998,7.57240762 28.6247631,9.25285316 C36.2754428,11.0017431 34.8805832,22.0217596 34.8805832,22.0217596 L36.6383358,20.3643029 Z" id="Rectangle-40-Copy-3" fill="#52312B"></path>
                                <path d="M33.6847749,20.7886878 C34.2709146,19.0649736 36.1250758,18.1484361 37.8269954,18.7418351 L37.8269954,18.7418351 C39.528541,19.3351037 40.4332917,21.2118143 39.8466164,22.9371035 L38.668806,26.4007972 C38.0826663,28.1245113 36.2285051,29.0410489 34.5265854,28.4476498 L34.5265854,28.4476498 C32.8250399,27.8543812 31.9202892,25.9776707 32.5069645,24.2523815 L33.6847749,20.7886878 L33.6847749,20.7886878 Z" id="Rectangle-40-Copy" fill="#EABF91"></path>
                                <path d="M12.4983618,20.7886878 C11.9122221,19.0649736 10.0580609,18.1484361 8.35614127,18.7418351 L8.35614127,18.7418351 C6.65459574,19.3351037 5.74984505,21.2118143 6.33652036,22.9371035 L7.51433075,26.4007972 C8.10047046,28.1245113 9.95463165,29.0410489 11.6565513,28.4476498 L11.6565513,28.4476498 C13.3580968,27.8543812 14.2628475,25.9776707 13.6761722,24.2523815 L12.4983618,20.7886878 L12.4983618,20.7886878 Z" id="Rectangle-40-Copy-2" fill="#EABF91"></path>
                                <path d="M23.3994559,37.4369914 C26.6302466,37.4369914 29.2493199,34.7608475 29.2493199,31.4596566 C26.3195598,31.8667682 21.4402378,31.4596567 17.549592,31.4596566 C17.549592,34.7608475 20.1686653,37.4369914 23.3994559,37.4369914 Z" id="Oval-102" fill="#FFFFFF"></path>
                                <ellipse id="Oval-103" fill="#000000" cx="27.8638258" cy="19.3476888" rx="1.3854941" ry="1.41568455"></ellipse>
                                <ellipse id="Oval-103-Copy" fill="#000000" cx="17.3956482" cy="19.3476888" rx="1.3854941" ry="1.41568455"></ellipse>
                                <rect id="Rectangle-52" fill="#F10C29" x="35.4070715" y="74.5593862" width="9.54451492" height="3.46056223"></rect>
                                <rect id="Rectangle-52-Copy" fill="#F10C29" x="0.615775156" y="74.5593862" width="9.54451492" height="3.46056223"></rect>
                                <rect id="Rectangle-53" fill="#EABF91" x="0.615775156" y="78.0199485" width="9.54451492" height="10.0670901"></rect>
                                <g id="Rectangle-53">
                                    <use fill="black" fill-opacity="1" filter="url(#filter-5)"></use>
                                    <use fill="#EABF91" fill-rule="evenodd"></use>
                                </g>
                                <g id="Rectangle-53-Copy-2">
                                    <use fill="black" fill-opacity="1" filter="url(#filter-7)"></use>
                                    <use fill="#EABF91" fill-rule="evenodd"></use>
                                </g>
                                <rect id="Rectangle-53-Copy" fill="#EABF91" x="35.4070715" y="78.0199485" width="9.54451492" height="10.0670901"></rect>
                            </g>
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

export default SvgDefinitions;
