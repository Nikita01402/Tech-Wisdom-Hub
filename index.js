const { log } = require("console");
const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})); //"For every request, if it contains form data, read it."
app.use(express.json());    //for every request if it is json read it
app.use(express.static(path.join(__dirname,"public"))); //"For every request asking for CSS, JS, or images, look inside the public folder."
const {v4:uuidv4} = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
 
app.listen(port,()=>{
    console.log(`listening on ${port}`);
})

let posts = [
   {
    id:uuidv4(),
    username:"linus_torvalds",
    content:"Talk is cheap. Show me the code."
   },
   {
    id:uuidv4(),
    username:"bill_gates",
    content:"It's fine to celebrate success, but it is more important to heed the lessons of failure."
   },
   {
    id:uuidv4(),
    username:"steve_jobs",
    content:"Everybody in this country should learn how to program because it teaches you how to think."
   },
   {
    id:uuidv4(),
    username:"grace_hopper",
    content:"The most dangerous phrase in the language is: 'We've always done it this way."
   },
   {
   id:uuidv4(),
    username:"martin_fowler",
    content:"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
   },{
    id:uuidv4(),
    username:"bjarne_stroustrup",
    content: "There are only two kinds of languages: the ones people complain about and the ones nobody uses."
},
{
    id:uuidv4(),
    username:"kent_beck",
    content:"Make it work, make it right, make it fast."
}
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts/new",(req,res)=>{
    let id = uuidv4();
   let {username,content}=req.body;
   posts.push({id,username,content});
   res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id==p.id)
  res.render("show.ejs",{post});
  
})

app.patch("/posts/:id",(req,res)=>{
        let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id==p.id)
    post.content =newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id==p.id);
    res.render("edit.ejs");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id != p.id);
    res.redirect("/posts");
})
