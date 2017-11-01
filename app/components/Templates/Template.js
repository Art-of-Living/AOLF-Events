import React from 'react';
import ImperialTemplate from './imperial/index';
import FragmentTemplate from './fragment/index';
import DefaultTemplate from './default/index';
import MindMeditation from './mindmeditation/index';


const components = {
    Imperial: ImperialTemplate,
    Fragment: FragmentTemplate,
    Default: DefaultTemplate,
	MindMeditation : MindMeditation
};

class Template extends React.Component {
  render() {
    var eventData = this.props.data;
	console.log(this.props.name);
	var Template = (typeof(components[this.props.name]) !== 'undefined') ?  components[this.props.name] : DefaultTemplate;
	
	return (
      <div>
		 <Template data={eventData} />
      </div>
    );
  }
}

export default Template;
