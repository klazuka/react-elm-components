var React = require('react');

module.exports = React.createClass({
	storeRef: function(node) {
		this.myRef = node;
	},

	shouldComponentUpdate: function(prevProps) {
		return false;
	},

	render: function() {
		return React.createElement('div', { ref: this.storeRef });
	},

	componentDidMount: function() {
		// Workaround issue #3 by embedding the Elm module every time the
		// component mounts. This is definitely not the way 'embed' is meant
		// to be used, but it seems to work. One thing I did notice is that
		// it appears to leak memory, but the good news is that Chrome GC
		// eventually catches up. Nevertheless, we should fix as this
		// workaround *may* result in nasty bugs.
		// TODO [kl] improve the workaround by embedding the Elm app only once!
		var app = this.props.src.embed(this.myRef, this.props.flags);

		if (typeof this.props.ports !== 'undefined') {
			this.props.ports(app.ports);
		}
	},

	componentWillUnmount: function() {
		// Ideally we would stop Elm here, but there is no such API currently.
	}
});