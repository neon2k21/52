const db = require('../config')



class PublicationController{

    async createPublication(req,res){

        
        const { useradd, name, points_names, review,  image1, image2,
            image3, startpoint, endpoint, waypoint1, waypoint2, waypoint3, waypoint4, waypoint5,
            waypoint6, waypoint7, waypoint8, object_id_startPoint, object_id_EndPoint, object_id_waypoint1, object_id_waypoint2,
            object_id_waypoint3, object_id_waypoint4, object_id_waypoint5, object_id_waypoint6, object_id_waypoint7,		
            object_id_waypoint8	 } = req.body
        const sql = (
            `insert into publications (useradd, name, points_names, review,  image1, image2,
                image3, startpoint, endpoint, waypoint1, waypoint2, waypoint3, waypoint4, waypoint5,
                waypoint6, waypoint7, waypoint8, object_id_startPoint, object_id_EndPoint, object_id_waypoint1, object_id_waypoint2,
                object_id_waypoint3, object_id_waypoint4, object_id_waypoint5, object_id_waypoint6, object_id_waypoint7,		
                object_id_waypoint8) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?);`
        )
        db.all(sql,[useradd, name, points_names, review,  image1, image2,
            image3, startpoint, endpoint, waypoint1, waypoint2, waypoint3, waypoint4, waypoint5,
            waypoint6, waypoint7, waypoint8, object_id_startPoint, object_id_EndPoint, object_id_waypoint1, object_id_waypoint2,
            object_id_waypoint3, object_id_waypoint4, object_id_waypoint5, object_id_waypoint6, object_id_waypoint7,		
            object_id_waypoint8], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })

    }   

    async getAllPublications(req,res){
        countLikesAndLikes(db)
        const sql = (
            `select * from publications`
        )
        db.all(sql,[], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
    })


    }


    async getallpublicationbyfilter(req,res){
        // const { pass,id } = req.body
        // const sql = (
        //     `update users set pass=? where id =?;`
        // )
        // db.all(sql,[pass, id], (err,rows) => {
        //     if (err) return res.json(err)
        //     else res.json(rows)
        //  })
        
    }    

    async approvepublication(req,res){
        const { id } = req.body
        const sql = (
            `update publications set checked=1 where id =?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
    }  

    async deletepublication(req,res){
        const { id } = req.body
        const sql = (
            `delete from publications where id =?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
        
    } 


    async putlikepublication(req,res){
        const { useradd,publication_id  } = req.body
        const sql = (
            `insert into likes (useradd, publication_id) values (?, ?);`
        )
        db.all(sql,[useradd, publication_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
        countLikesAndLikes(db)
    } 

    async writecommentpublication(req,res){
        const { useradd,text, publication_id } = req.body
        const sql = (
            `insert into Comments (useradd, text) values (?, ?) where id =?;`
        )
        db.all(sql,[useradd,text, publication_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
        countLikesAndLikes(db)
    } 

    async deletelikepublication(req,res){
        const { id,publication_id, useradd } = req.body
        const sql = (
            `delete from Likes where id = ? AND publication_id =? AND useradd=?;`
        )
        db.all(sql,[id,publication_id, useradd], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
        
    } 
    
    async deletecommentpublication(req,res){
        const { id,publication_id, useradd } = req.body
        const sql = (
            `delete from Comments where id = ? AND publication_id =? AND useradd=?;`
        )
        db.all(sql,[id,publication_id, useradd], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
        
    } 
}

 async function getInfoForlikesAndComment(db) {

    return new Promise((resolve, reject) => {
        var responseObj;
        db.all(`select * from publications;`,(err, rows) => {
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


async function countLikesAndLikes(db){
    const newObject = await getInfoForlikesAndComment(db)
    console.warn(newObject.rows)
    for(let i = 0; i < newObject.rows.length;i++ ){
        const obj_likes = await countLikesForCurrentPublication(newObject.rows[i].id)
        const obj_comments = await countCommentsForCurrentPublication(newObject.rows[i].id)
        await db.all(`update publications set likes_count = ? where id = ?;`, [ obj_likes.count ,newObject.rows[i].id ])
        await db.all(`update publications set comments_count = ? where id = ?;`, [ obj_comments.count ,newObject.rows[i].id ])

    }
   
}

async function countLikesForCurrentPublication(id){
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT COUNT(*) as count FROM Likes WHERE publication_id = ?;`,[id],(err, row) => {
            if (err) reject(err); // I assume this is how an error is thrown with your db callback
            resolve(row);
            console.log(row)
        });
    });

    
}

async function countCommentsForCurrentPublication(id){
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT COUNT(*) as count FROM Comments WHERE publication_id = ?;`,[id],(err, row) => {
            if (err) reject(err); // I assume this is how an error is thrown with your db callback
            resolve(row);
            console.log(row)
        });
    });
}




module.exports = new PublicationController()