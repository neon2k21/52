const db = require('../config')



class UserController{

    async createUser(req,res){
        
        const { nickname, login, pass, token, role } = req.body
        const sql = (
            `insert into users (nickname, login, pass, token, role) values (?, ?, ?, ?, 1);`
        )
        db.all(sql,[nickname, login, pass, token, role], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })

    }   

    async getUser(req,res){
        const { login, password, token} = req.body
        console.log(login, password)
        const sql = (
            `select * from users where (login=? AND password=?) or token=?;`
        )
        db.all(sql,[login, password, token], (err,rows) => {
            if (err) return res.json(err)
            if(rows.length === 0) return res.json('Данные не совпадают! Проверьте и повторите попытку')
            else res.json(rows)
    })
    }


    async updateUser(req,res){
        const { pass,id } = req.body
        const sql = (
            `update users set pass=? where id =?;`
        )
        db.all(sql,[pass, id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
        
    }    

    async deleteUser(req,res){
        const { id } = req.body
        const sql = (
            `delete from users where id =?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
        
    }    
}



module.exports = new UserController()