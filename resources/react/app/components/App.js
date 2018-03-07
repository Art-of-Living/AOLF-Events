import React from 'react';
import { Helmet } from 'react-helmet';

class App extends React.Component {
    render() {
        return ( <
            div >
            <
            Helmet >
            <
            title > Events < /title> <
            meta name = "description"
            content = "Some description." / >
            <
            meta property = "og:url"
            content = "Mind & Meditation: FREE Mini Workshop" / >
            <
            meta property = "og:title"
            content = "Mind & Meditation: FREE Mini Workshop" / >
            <
            meta property = "og:type"
            content = "fitness" / >
            <
            meta property = "og:image"
            content = "{{{baseurl}}}templates/ArtOfLiving/images/home_banner_fb.jpg" / >
            <
            meta property = "fb:app_id"
            content = "547829512233839" / >
            <
            meta property = "og:description"
            content = "Unlock the power of your breath and discover the easy, effective approach to meditation that has already helped millions." / >
            <
            /Helmet> { this.props.children } < /
            div >
        );
    }
}

export default App;