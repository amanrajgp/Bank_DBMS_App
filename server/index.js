const express=require("express");
const app=express();
const mysql=require("mysql");
const cors=require("cors");

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database:"Bank_DBMS_app"
});

app.post("/create",(req,res)=>{
    const name=req.body.name;
    const age=req.body.age;
    const country =req.body.country;
    const position=req.body.position;
    const salary=req.body.salary;
    

    db.query(
        "INSERT INTO customers_info (name,age,country,position,salary) VALUES (?,?,?,?,?)",
        [name,age,country,position,salary],
        (err,result)=>{
            if (err) {
                console.log(err);
            }else {
                res.send("values inserted");
            }
        }
    );
});

app.get("/employees",(req,res)=>{
    const amount=20000;
    const input1="*";
    const operator=">";    
    
    db.query("SELECT "+input1+" FROM customers_info where salary "+operator + amount,(err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
    })
})


app.listen(3001,()=>{
    console.log("server is running on port 3001");
});