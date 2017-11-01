export default function title(state, action) {
	switch(action.type){
		case 'title':
			return action.title;
		break;
		default : 
			return '';
	}
}
