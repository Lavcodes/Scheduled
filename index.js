const express = require('express');
const app = express();
const pool = require('./database_config');


app.use(express.json());


app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.send(JSON.stringify(results));
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

app.get("/teachers", async(req, res) =>{
    try{
       
        const teachers = await pool.query("SELECT * from teachers");
        res.send(teachers);

    }catch(err){
        console.error(err);
    }

});


// add a new teacher
app.post("/teachers", async(req, res) => {
    try {
        const { teacher_name, department, avatar} = req.body;
        const new_teacher = await pool.query("INSERT INTO teachers (teacher_name, department, avatar) VALUES ($1, $2, $3) RETURNING *", 
        [teacher_name, department, avatar]);
        res.json(new_teacher);
    } catch(err){
        console.error(err);
    }
});

app.post("/events", async(req, res) => {
    try{
        const {teacher_id, title, description, month, year, day, start_at, end_at} = req.body;
        const new_event = await pool.query("INSERT INTO events (teacher_id, title, description, month, year, day, start_at, end_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [teacher_id, title, description, month, year, day, start_at, end_at] );
        res.json(new_event);

    }catch(err){
        console.error(err);
    }
})

app.get("/events/:teacher_id", async(req,res) => {
    try{
        const teacher_id = parseInt(req.params.teacher_id) 
        const events = await pool.query("SELECT * from events WHERE teacher_id=$1",[teacher_id]);
        res.send(events);

    }catch(err){
        console.error(err);

    }
})

app.get("/events/:teacher_id/:year/:month", async(req,res) => {
    try{
        const teacher_id = parseInt(req.params.teacher_id);
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month);
        const events = await pool.query("SELECT * from events WHERE teacher_id=$1 and year=$2 and month=$3",[teacher_id, year, month]);
        res.send(events);

    }catch(err){
        console.error(err);

    }
})

app.get("/events/:teacher_id/:year/:month/:day", async(req,res) => {
    try{
        const teacher_id = parseInt(req.params.teacher_id);
        const year = parseInt(req.params.year);
        const month = parseInt(req.params.month);
        const day = parseInt(req.params.day);
        const events = await pool.query("SELECT * from events WHERE teacher_id=$1 and year=$2 and month=$3 and day=$4",[teacher_id, year, month, day]);
        res.send(events);

    }catch(err){
        console.error(err);

    }
})

if(process.env.NODE_ENV ==='production'){
    // Express will serve up production assets
    app.use(express.static('client/build'));

    //Express will serve up index.html
    const path = require('path');
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });


}

const PORT = process.env.PORT || 5000;


app.listen(PORT);