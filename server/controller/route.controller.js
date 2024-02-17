const db = require('../config')
const { format } = require('date-fns');



class RouteController{
    

    async createRoute(req,res){
      
        const today = new Date();
        const formattedToday = format(today, 'yyyy-MM-dd');
        const {route, useradded} = req.body;


        const sql = (
        `insert into routes (  route, useradded, mark, date, countmarks) 
        values (?, ?, ?, ?, ? )`)
        db.all(sql,[ route, useradded, 0, formattedToday, 0 ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
        })
    }  
    

    async getRoute(req,res){

       
        const {id} = req.body;


        const sql = (
        `select * from routes where id=?`)
        db.all(sql,[ id ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
        })

    }
    
    async updateRating(req,res){


      
        var total_marks = 0
        var total_rate = 0
             
        const {id,mark} = req.body;

        const sql_add = (
            `insert into routes_marks values (?, ?)`)
            db.all(sql_add,[ id, mark ], (err,rows) => {
                if (err) return res.json(err)
                else return res.json(rows)
            })

        const countmarks_all =  await getcountmarks(db)

        for(let i = 0;  i   <   countmarks_all.length; i++ ){
            if(countmarks_all[i].route_id == id) {
                total_rate += countmarks_all[i].mark;
                total_marks++;
            }
        }

        var raitng = total_rate/total_marks 


        const sql = (
        `update routes set mark = ?, countmarks  = ? where id=?`)
        db.all(sql,[ raitng, total_marks, id ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
        })

    }  
    
   async deleteRoute(req, res){
    const { id, userid } = req.body
    const sql = (
        `delete from routes where (id =? AND useradded = ?) ;`
    )
    db.all(sql,[id, userid], (err,rows) => {
        if (err) return res.json(err)
        else res.json(rows)
     })
   }

}

async function getcountmarks(db) {
    return new Promise((resolve, reject) => {
        var responseObj;
        db.all(`select * from routes_marks;`,(err, rows) => {
            if (err) {
                responseObj = {
                  'error': err
                };
                reject(responseObj);
              } else {
                responseObj = {
                  rows: rows
                };
                resolve(responseObj);
            }
        });
    });
}

module.exports = new RouteController()