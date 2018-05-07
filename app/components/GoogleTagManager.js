import React from 'react';
import gtmParts from 'react-google-tag-manager';

class GoogleTagManager extends React.Component {
    componentDidMount() {
        const dataLayerName = this.props.dataLayerName || 'dataLayer';
        const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm';
		
		const gtm = gtmParts({
            id: this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
        });

        if (!window[dataLayerName]) {
             eval(gtm.scriptAsHTML().replace(/<\/?script>/g, ''));
        }
    }

    render() {
        const gtm = gtmParts({
            id: this.props.gtmId,
            dataLayerName: this.props.dataLayerName || 'dataLayer',
            additionalEvents: this.props.additionalEvents || {},
            previewVariables: this.props.previewVariables || false,
        });

        return gtm.noScriptAsReact();
    }
}

GoogleTagManager.propTypes = {
    gtmId: React.PropTypes.string.isRequired,
    dataLayerName: React.PropTypes.string,
    additionalEvents: React.PropTypes.object,
    previewVariables: React.PropTypes.string,
    scriptId: React.PropTypes.string
};

export default GoogleTagManager;