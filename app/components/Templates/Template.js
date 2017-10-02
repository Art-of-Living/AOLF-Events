import React from 'react';
import ImperialTemplate from './imperial/index';
import FragmentTemplate from './fragment/index';
import DefaultTemplate from './default/index';


const components = {
    Imperial: ImperialTemplate,
    Fragment: FragmentTemplate,
    Default: DefaultTemplate
};

class Template extends React.Component {
  render() {
    var eventData = this.props.data;
	var Template = (typeof(components[this.props.name]) !== 'undefined') ?  components[this.props.name] : DefaultTemplate;
	
	console.log(Template);
	console.log(ImperialTemplate);
	
	return (
      <div>
		 <Template data={eventData} />
      </div>
    );
  }
}

export default Template;
