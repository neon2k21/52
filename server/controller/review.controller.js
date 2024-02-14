const db = require('../config')

router.post('/createreview',)

router.get('/getallreviews',)

router.post('/getcurrentreview',)

router.delete('/deleteeview',)

router.put('/applyreview',)

class ReportController{


    async createReview(req,res){
      
        const {  user, object, comment, mark, photo, link, checked } = req.body
        const sql = (
            `insert into Review ( user, object, comment, mark, photo, link, checked ) values ($1, $2, $3, $4, $5, $6, $7);`
        )
        db.all(sql,[user, object, comment, mark, photo, link, checked], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
    } 
    
    async updateObject(req,res){
        const { longitute, altitude, category, working_time, address, image, name, phone, website, id } = req.body
        const sql = (
            `update objects set longitute = ?, altitude = ?, category = ?, working_time = ?, address = ?, image = ?, name = ?, phone = ?, website = ? where id = ?;`
        )
        db.all(sql,[longitute, altitude, category, working_time, address, image, name, phone, website, id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
        
    }

    async deleteObject(req,res){
        const { id } = req.body
        const sql = (
            `delete from objects where id = ?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
        
    }
  

   async getAllObjects(req,res){

        const sql = 
        `SELECT * from objects`
       
        await db.all(sql,[], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
       })

    }

    async getCurrentObject(req,res){

        const {id} = req.body
       
        const sql = 
            `SELECT * from objects WHERE  id= ?;`

        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
       })
    }

    

    


}



module.exports = new ReportController()