
var mydata = {};

var counter = 1;

//backbone Model (we can set bind events to the attribute changes to run specific functions)
var Model = Backbone.Model.extend({
  initialize: function(){
     this.bind("change", function(){changeData()});
     this.bind("change:scores", function(){changeScores()});
   }
});
var mymodel = new Model();

// Backbone Views
// 1st view includes a click event
var view = Backbone.View.extend({
  tagName : "span",
  events: {  
        'click .name': 'handleClick'  
  },
  render: function() {
    $(this.el).html(_.template('<p class="name">this is an example: ' + this.model.get('title') + ' ' + counter + '</p>'), this.model.toJSON());
    return this; // always good pratice to return this.
  },  
  //simple handler   
  handleClick: function(){  
    alert('ouch!!! that hurt');  
  }
});
    
var scoreboard = Backbone.View.extend({
  tagName : "p",
  render: function(){
    var scores = this.model.get('scores');
    $(this.el).html(_.template('player one ' + scores.player1 + ' : player two ' + scores.player2));
    return this;
  }
});
      
var anotherView = Backbone.View.extend({
  tagName : "p",
  render: function(){
    $(this.el).html(_.template('some more data: ' + this.model.get('name') + ' ' + this.model.get('data')));
    return this;
  }
});
    
// this is another view, this time pulling in the html from another function (make_a_url);
var list = Backbone.View.extend({
  tagName : "ul",
  render: function(){ 
  $(this.el).html(_.template(make_a_ul(this.model)));
  return this;
  }
});

 // just a function to build some html
make_a_ul = function(model) {
  string = "<li>Some of the attributes</li>";
  string += "<li><strong>title:</strong> " + model.get('title') + "</li>";
  string += "<li><strong>name:</strong> " + model.get('name') + "</li>";
  string += "<li><strong>width:</strong> " + model.get('width') + "</li>";
  string += "<li><strong>height:</strong> " + model.get('height') + "</li>";
  string += "<li><strong>src:</strong> " + model.get('src') + "</li>";
  return string;
 };


// this is where it matches the view to the model, note each object is a new instance of a view
var myview = new view({model: mymodel});
var myotherview = new anotherView({model: mymodel});
var mydifview = new view({model: mymodel});
var mylist = new list({model: mymodel});
var myscoreboard = new scoreboard({model: mymodel});

// and now attaching our 'view' object to the dom (only if there is a difference)
changeData = function(){
  $("#mydata").html(myview.render().el);  
  $("#moredata").html(myotherview.render().el);
  $("#sameas").html(mydifview.render().el);
  $("#list").html(mylist.render().el);
}

changeScores = function(){
  $("#scoreboard").html(myscoreboard.render().el);
}



loadTheData = function(){
  $.getJSON('random.json', function(data){ 
    //update our model with the new data
    mymodel.set(data);
   });
   var reload = setTimeout("loadTheData()", 1000);
};


$(document).ready(function(){
  loadTheData();
  
});

