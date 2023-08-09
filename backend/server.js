const express=require('express');
const userRoutes=require('./routes/userRoutes');
const leaveRoutes=require('./routes/leaveRoutes');
const teamRoutes=require('./routes/teamRoutes');
const projectRoutes=require('./routes/projectRoutes');
const morgan=require('morgan');
const cors=require('cors');

const multer = require("multer");
const upload = multer({ dest: "uploads/" });


const app=express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRoutes);
app.use('/api/leave',leaveRoutes);
app.use('/api/team',teamRoutes);
app.use('/api/project',projectRoutes);

app.post("/api/upload", upload.single("myFile"), (req, res) => {
    console.log("Body: ", req.body);
    console.log("File: ", req.file);
    res.send("File successfully uploaded.");
});

const {sequelize}=require('./db/index');
    sequelize.sync()
    .then(()=>{
        console.log('db synced');
    })
    .catch((err)=>{
        console.log(
            {
                "message":'db not synced',
                "error":err.message
        });
    }
);

const port =4000;
app.listen(port, ()=>{
    console.log(`server started on port ${port} !!!`);
});