
var mydata = {};

var counter = 1;

loadTheData = function(){
  
  $.getJSON('random.json', function(data){
   
   
   //backbone model (not much going on here, but we can add or append to the model using set)

   var Model = Backbone.Model.extend();
   var mymodel = new Model(data);

   //backbone views (more of a MVC controller really...)

   // 1st view includes a click event
   var View = Backbone.View.extend({
     tagName : "span",
     events: {  
            'click .name': 'handleClick'  
     },
  
    render: function() {
      console.log(this.model);
      $(this.el).html(
        _.template('<p class="name">this is an example: ' + this.model.get('title') + ' ' + counter + '</p>'), this.model.toJSON());
        return this; // always good pratice to return this.
      },
      
      //simple handler   
     handleClick: function(){  
      alert('ouch!!! that hurt');  
      }
    });
      
    var anotherView = Backbone.View.extend({
      tagName : "p",
      render: function(){ 
        $(this.el).html(
          _.template('some more data: ' + this.model.get('name') + ' ' + this.model.get('data')));
          return this
        }
    });
    
    // this is another view, this time pulling in the html from another function (make_a_url);
    var list = Backbone.View.extend({
       tagName : "ul",
       render: function(){ 
         $(this.el).html(
           _.template(make_a_ul(this.model)));
           return this
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
    var myview = new View({model: mymodel});
    var myotherview = new anotherView({model: mymodel});
    var mydifview = new View({model: mymodel});
    var mylist = new list({model: mymodel});
    
    // and now attaching our 'view' object to the dom
    $("#mydata").html(myview.render().el);  
    counter ++;
    $("#moredata").html(myotherview.render().el);
    $("#sameas").html(mydifview.render().el);
    counter ++;
    $("#list").html(mylist.render().el);

    console.log(myview);
    var reload = setTimeout("loadTheData()", 2000);
   }); // end of getJSON function

};

$(document).ready(function(){
  loadTheData();
});

