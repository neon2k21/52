const db = require('../config')


class ObjectController{

    async createObject(req,res){
      
        const { longitute, altitude, category, address, image, name, phone, website, monday,tuesday,wednesday,thursday,friday, saturday,sunday } = req.body
        const sql = (
            `insert into objects ( longitute, altitude, category, address, image, name, phone, website, monday,tuesday,wednesday,thursday,friday, saturday,sunday) values ( $1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15);`
        )
        db.all(sql,[longitute, altitude, category,  address, image, name, phone, website, monday,tuesday,wednesday,thursday,friday, saturday,sunday], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
    } 
    
    // async updateObject(req,res){
    //     const { longitute, altitude, category, working_time, address, image, name, phone, website, id } = req.body
    //     const sql = (
    //         `update objects set longitute = ?, altitude = ?, category = ?, working_time = ?, address = ?, image = ?, name = ?, phone = ?, website = ? where id = ?;`
    //     )
    //     db.all(sql,[longitute, altitude, category, working_time, address, image, name, phone, website, id], (err,rows) => {
    //         if (err) return res.json(err)
    //         else return res.json(rows)
    // })
        
    // }

    async updateObject(req,res){
        const {  phone, id } = req.body
        const sql = (
            `update objects set  phone = ? where id = ?;`
        )
        db.all(sql,[ phone, id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
        
    }

    async deleteObject(req,res){
        const { id } = req.body
        const sql = (
            `delete from objects where id = ${id};`
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

module.exports = new ObjectController()