const express=require("express")
const jwt=require('jsonwebtoken')
const JWT_SECRET= "randomspilovesp"
const app=express()
app.use(express.json())
const users=[];
//without jwts
// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         // use a simple function here
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }
app.post("/signup",function(req,res){

    const username=req.body.username;
    const password=req.body.password;
    if(users.find(u=> u.username===username)){
        res.json({
            message:"You are already Signedup"
        })
        return
    }
    users.push({
        username:username,
        password:password
    })
    res.json({
        message: "You are signed in"
    })

})

app.post("/signin",function(req,res){

    const username=req.body.username;
    const password=req.body.password;

    // const user=users.find(function(u){
    //     if(u.username==username && u.password==password){
    //         return true;
    //     }
    //     else{
    //         return false
    //     }
    // })

    let foundUser=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username==username && users[i].password==password){
            foundUser=users[i]
        }
    }

    if(foundUser){
        // const token=generateToken();
        const token=jwt.sign({
            username:username
        },JWT_SECRET);//convert their username over to a jwt
        // foundUser.token=token;
        res.json({
            message:token
        })
    }else{
        res.status(403).send({
            message:"Invalid username or password"
        })
    }

})
app.get("/me",function(req,res){
    const token = req.headers.token //jwt
    const decodedInformation=jwt.verify(token,JWT_SECRET); //{username : "sp@gmail.com"}
    const username=decodedInformation.username



    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username==username){
            foundUser=users[i]
        }
    }

    if(foundUser){
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    } else{
        res.json({
            message:"Token Invalid"
        })
    }

})

app.listen(3000)//that the http server is listening  on port 3000