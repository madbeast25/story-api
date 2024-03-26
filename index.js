import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=4040;
const url="http://localhost:3000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.post("/get-story",async (req,res)=>{
  const id=req.body.id;
  const type=req.body.type;
  if(id){
    try{
    const response=await axios.get(`${url}/story/${id}`);
    const result=response.data;

    res.render("story.ejs",{content:result});
  }catch(error){
    console.log(error);
  }
  }else if(type){
    try{
      const response=await axios.get(`${url}/story`,{
        params:{
          type:type
        }
      });
      const result=response.data;
      console.log();

      res.render("story.ejs",{content:result});
      
    }catch(error){
      console.log(error);
    }
  }else{
    try{
      const response=await axios.get(`${url}/story/random`);
      const result=response.data;

      res.render("story.ejs",{content:result});

    }catch(error){
      console.log(error);
    }
  }
});


app.post("/post-story",async (req,res)=>{

  console.log(req.body.title);
  
   try{
     const response=await axios.post(`${url}/story/post`,req.body);
     const result=response.data;

     console.log(result);
     res.redirect("/");

   }catch(error){
    console.log(error);
   }
});

app.post("/delete-story",async (req,res)=>{
  const id=req.body.id;
   try{
    const response=await axios.delete(`${url}/story/${id}`);
    const result=response.data;
   }catch(error){
    console.log(error);
   }
});

app.get("/story",async (req,res)=>{
   try{
    const response=await axios.get(`${url}/story/random`);
    const result=response.data;

    res.render("story.ejs",{content:result});
   }catch(error){
    console.log(error);
   }
});

app.post("/put-story",async (req,res)=>{
  const id=req.body.id;
  const body=req.body;
   try{
     const response=await axios.put(`${url}/story/${id}`,body);
     const result=response.data;

     res.render("story.ejs",{content:result});

   }catch(error){
    console.log(error);
   }
});

app.post("/patch-story",async (req,res)=>{
   const id=parseInt(req.body.id);
   try{
     const response=await axios.patch(`${url}/story/${id}`,req.body);
     const result=response.data;

     console.log(result);
     res.redirect("/");
   }catch(error){
    console.log(error);
   }
});



app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
});