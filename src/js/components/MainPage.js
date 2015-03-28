var React = require('react');
var Torrent = require('./Torrent');

var socket = io.connect('http://localhost:3000');

var MainPage = React.createClass({

  getInitialState: function() {
    return {
      torrents: []
    }
  },

  componentDidMount: function() {
    var fetchTorrents = (function(torrentsArray) {
      this.setState({
        torrents: torrentsArray
      })
    }).bind(this);

    socket.on('fetch-torrents', fetchTorrents);
    var getUpdates = function() {
      socket.emit('getUpdates', {})
    };

    setInterval(getUpdates, 20);

  },

  render: function() {
    return (
      <div className="main-container">
      {this.renderTorrents()}
      </div>
    );
  },

  renderTorrents: function() {
    return this.state.torrents.map(function(torrent) {
      return <Torrent key={torrent.infoHash} {...torrent}/>
    })
  }
});


module.exports = MainPage;
