/**
 * Katappa - A block based rich text editor with support of Images, embeds( Youtube, twitter, etc)
 * @version v0.1.2
 * @link https://github.com/brijeshb42/katappa
 * @license MIT
 */
"use strict";!function(window){var APP=window.Katappa||{},Types=APP.Blocks.Embed.Types||{},oEmbedUrl="/tweet?url=",loaded=!1,Twitter=React.createClass({displayName:"Twitter",getInitialState:function(){return{message:"Wait",id:"",valid:!1,html:""}},getDefaultProps:function(){return{url:"",regex:/https?\:\/\/twitter\.com\/(?:[a-zA-Z0-9_]+)\/(?:status)\/([0-9]+)\/?(.*){0,}/gi}},loadExternalScript:function(){if(loaded)return console.log("already loaded"),void(window.twttr&&twttr.widgets.load());var scriptUrl="//platform.twitter.com/widgets.js",tag=document.createElement("script");tag.src=scriptUrl,tag.async=1,tag.onload=function(){loaded=!0,window.twttr&&(console.log("loaded now"),twttr.widgets.load())},window.document.body.appendChild(tag)},componentDidMount:function(){this.validate()},validate:function(){var match;if(match=this.props.regex.exec(this.props.url),this.props.regex.lastIndex=0,!match)return this.props.checkContent(!1),void this.setState({message:"error."});var self=this;fetch(oEmbedUrl+this.props.url).then(function(response){if(response.status>=200&&response.status<300)return response.json();var error=new Error(response.statusText);throw error.response=response,error}).then(function(json){json.html&&(self.setState({html:"<div>"+json.html+"</div>"}),self.loadExternalScript())})["catch"](function(error){console.log(error),self.setState({message:"Error while loading tweet."})}),this.setState({message:"Loading...",id:match[1],valid:!0}),this.props.checkContent(!0)},render:function(){return console.log("rndr"),console.log(this.state),this.state.valid?""===this.state.html?React.createElement("div",{className:"katapembed kataptwitter"},this.state.message):React.createElement("div",{className:"katapembed kataptwitter",dangerouslySetInnerHTML:{__html:this.state.html}}):React.createElement("div",{className:"katapembed"},"Invalid twitter URL.")}});Types.twitter=Twitter,APP.Blocks.Embed.Types=Types,window.Katappa=APP}(window);
//# sourceMappingURL=maps/katappa.embed.js.map