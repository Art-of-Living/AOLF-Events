import React from 'react';
import ImperialTemplate from './imperial/index';
import FragmentTemplate from './fragment/index';
import DefaultTemplate from './default/index';
import MindMeditation from './mindmeditation/index';
import ArtOfLiving from './artofliving/index';
import ArtOfLivingOnline from './artoflivingonline/index';
import ArtOfLivingNew from './artoflivingnew/index';

const templates = {
    Imperial: ImperialTemplate,
    Fragment: FragmentTemplate,
    Default: DefaultTemplate,
	MindMeditation : MindMeditation,
	ArtOfLiving : ArtOfLiving,
	ArtOfLivingOnline : ArtOfLivingOnline,
	ArtOfLivingNew : ArtOfLivingNew
};

class Template extends React.Component {
  render() {
    var eventData = this.props.data;
    var eventid = this.props.eventid;
	process.env.REACT_TEMPLATE = this.props.name
	var Template = (typeof(templates[this.props.name]) !== 'undefined') ?  templates[this.props.name] : DefaultTemplate;
	
	return (
      <div>
		 <Template eventid={eventid} data={eventData} />
      </div>
    );
  }
}

export default Template;
