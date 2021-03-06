var d3 = require('d3/d3');
var React = require('react/addons');
var CategoryVisualization = require('../visualizations/Category');
var ViewActionCreators = require('../actions/ViewActionCreators');

var CategoryComponent = React.createClass({
  componentDidMount() {
    // wrap element in d3
    this.d3Node = d3.select(this.getDOMNode());
    this.d3Node.datum(this.props.data)
      .on('click', this.onClick.bind(this))
      .call(CategoryVisualization.enter);
  },
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.update) {
      this.d3Node.datum(nextProps.data)
        .call(CategoryVisualization.update);
    }
    return true;
  },
  componentDidUpate() {
    this.d3Node.datum(this.props.data)
      .call(CategoryVisualization.update);
  },
  componentWillUnMount() {

  },
  onClick() {
    if (!this.props.data.id) return;
    
    if (this.props.data.selected) {
      ViewActionCreators.unselectNode();
    } else {
      ViewActionCreators.selectNode({
        type: 'category',
        id: this.props.data.id
      });
    }
  },
  render() {
    return (
      <g className="category">
        <circle className="back" />
        <circle className="front" />
        <rect />
        <text>{this.props.data.name}</text>
      </g>
    );
  }
});

module.exports = CategoryComponent;