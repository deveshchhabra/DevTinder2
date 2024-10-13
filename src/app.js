const express=require('express');//It is code comming Node.Js
const connectDB=require('./config/database');
const app=express();
const User=require("./models/user")
app.use(express.json())
app.post('/signup',async(req,res)=>{
    const user=new User(req.body);
    console.log(user)
    // const user=new User({
        
    //     firstName:"Akshay",
    //     lastName:"Saini",
    //     emailId:"aksahaysain@gmail.com",
    //     password:"akshay@123",
    // })
    try{

        await user.save();  
        res.send('User Added Sucessfully')
    }
    catch(err){
        res.status(400).send('Error Message',err.message);
    }
})

app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    console.log(userEmail)
    
    try{
        const users=await User.findOne({emailId:"670518508c8fd5a149c8a9ca"});
    if(!users){
        res.status(404).send('User Not Found')
    }
    else{
        res.send(users);
    }
//       if(users.length===1){
// res.status(404).send('User Not Found')
//       }else{
//         res.send(user);
//     }
}
    catch(err){
        res.status(400).send("Something Went Wrong")
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const users= await User.find({})
        res.send(users)
    }
    catch(err){
        res.status(404).send("Something Went Wrong")
    }
})
app.delete("/user",async(req,res)=>{
    const UserId=req.body.userId;
    // console.log(UserId)
    try{
        const user=await User.findByIdAndDelete(UserId);
        console.log(user);
        res.send("User Deleted Successfully")
    }
    catch(err){
res.status(400).send("something Went wrong");
    }
})
app.patch("/user",async(req,res)=>{
    const UserId=req.body.userId;
    const data=req.body;
    // console.log(data);
    try{
const user=await User.findByIdAndUpdate({_id:UserId},data,{
    runValidators:true,
});
console.log(user)
res.send("user updated sucessfully");
    }
    catch(err){
        res.status(400).send("something went wrong"+err.message);
    }
})
connectDB().then(()=>{
    console.log("Mongoose connection sucessfully")
    app.listen(3000,()=>{
        console.log("Server is SuccessFull....3000")
    });
})
.catch((err)=>{console.log("Database is cannot connected",err)})























// app.use('/',(req,res)=>{
//     res.send("Jai shree shyam!")
// })
// app.use('/test/2',(req,res)=>{
//     res.send("Hello dev!")
// });
// app.get("/user/",(req,res)=>{
//     console.log(req.query);
//     res.send({firstname:"devesh",lastName:"Chhabra"})
// })
// app.post('/user',(req,res)=>~{
//     res.send("Data successfully saved to database!!!");
// })
// app.delete("/user",(req,res)=>{
//     res.send("deleted from the databases")
// })
// app.use('/hello',(req,res)=>{
//         res.send("Jai shree Ram")})
// app.use('/',(req,res)=>{
//     res.send("Nameste DEV")})

