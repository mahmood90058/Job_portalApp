import  express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"
import userRoute from "./routes/userRoutes.js"
import companyRoute from "./routes/companyRoutes.js"
import jobRoute from "./routes/jobRoutes.js"
import applicationRoute from "./routes/applicationRoutes.js"
import path from "path"

dotenv.config({})

const app= express()

const _dirname= path.resolve()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions={
    // origin:'http://localhost:5173',
    origin:'https://job-portalapp-kbcz.onrender.com',
    credentials:true
}

app.use(cors(corsOptions))

const PORT= process.env.PORT || 3000


// apis
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.use(express.static(path.join(_dirname, "/franted/dist")))
app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "franted", "dist", "index.html"))
})


app.listen(PORT,()=>{
    connectDb()
    console.log(`server running at Port ${PORT}`)
})

