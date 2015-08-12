(function(window) {
  var APP = window.Katappa || {};

  var Droppable = React.createClass({
    getInitialState: function() {
      return {
        className: ''
      };
    },

    getDefaultProps: function() {
      return {
        supportClick: true,
        multiple: false
      };
    },

    getClassName: function() {
      return 'katapdroppable '+(this.props.className || this.state.className);
    },

    componentDidMount: function() {
      this.refs.droppable.getDOMNode().focus();
    },

    onDragOver: function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      var effectAllowed = e.dataTransfer.effectAllowed;
      if (effectAllowed === 'all' || effectAllowed === 'uninitialized') {
        this.setState({
          className: 'katapdrop-active'
        });
      }
      if (this.props.onDragOver) {
        this.props.onDragOver(e);
      }
    },

    onDragLeave: function(e) {
      this.setState({
        className: ''
      });

      if (this.props.onDragLeave) {
        this.props.onDragLeave(e);
      }
    },

    onClick: function() {
      var fileInput = React.findDOMNode(this.refs.input);
      fileInput.value = null;
      fileInput.click();
    },

    onDrop: function(e) {
      e.preventDefault();
      var files;
      if(e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if(e.target) {
        files = e.target.files;
      }
      var maxFiles = (this.props.multiple) ? files.length : 1;
      for (var i = 0; i < maxFiles; i++) {
        files[i].preview = URL.createObjectURL(files[i]);
      }
      if(this.props.onDrop) {
        files = Array.prototype.slice.call(files, 0, maxFiles);
        //console.log(files);
        this.props.onDrop(files);
      }
    },

    render: function() {
      return (
        <div
          ref="droppable"
          className={this.getClassName()}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onClick={this.onClick}
          onDrop={this.onDrop} >
          <input
            ref="input"
            type="file"
            style={{display: 'none'}}
            multiple={this.props.multiple}
            onChange={this.onDrop} />
          {this.props.children}
        </div>
      );
    }
  });

  APP.Droppable = Droppable;
  window.Katappa = APP;
})(window);
