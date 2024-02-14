const db = require('../config')



class ReviewController{


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

    async getAllReviews(req,res){
        
        const sql = (
            `select * from Review;`
        )
        db.all(sql,[], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
    } 
    
    async applyReview(req,res){
        const { id } = req.body
        const sql = (
            `update Review set checked = 1 where id = ?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
        
    }

    async deleteReview(req,res){
        const { id } = req.body
        const sql = (
            `delete from Review where id = ?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })
        
    }
  

    async getCurrentReview(req,res){

        const {id} = req.body
       
        const sql = 
            `SELECT * from Review WHERE id= ?;`

        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
       })
    }
 

}



module.exports = new ReviewController()