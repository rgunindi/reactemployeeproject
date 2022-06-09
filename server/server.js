const express=require('express');
const cors=require('cors');
const connection=require('./db');
const app=express();
app.use(cors());

app.get('/workareas',(req,res)=>{
    const TaskQuery = `SELECT * FROM employees`;
    connection.query(TaskQuery,(err,results)=>{
        if(err){
            return res.send(err);
        }
        return res.json({
            data:results
        });
    });
})


app.post('/addEmployee',(req,res)=>{
    const ADD_QUERY = `INSERT INTO task VALUES ('${req.body.task}')`;

}
)
app.get('/deleteEmployee',(req,res)=>{
    res.send('deleteEmployee');
})
app.listen(4000,()=>{
    console.log('Server started at port 4000');
})