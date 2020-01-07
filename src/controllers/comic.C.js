const express = require('express');
const firebaseM = require("../models/comic.M");


exports.viewComic = async function (req, res) {
    //const id = req.query.id
    const id = req.params.idComic
    const comic = await firebaseM.getComicByID(id)
    //console.log(comic)
    res.render("pages/comic_detail", {
        layout: 'index',
        comicDetail: comic,
    })
}

let currentChap;
 exports.readComic = async function(req,res){
     const idComic = req.params.idComic;
     let chap =parseInt(req.query.this);
     if(!chap)
     {
         chap=req.query.select;
         console.log(chap);
         if(!chap)
         {
             chap=1;
         }
     }
     currentChap=chap;
     console.log(idComic);
     console.log(req.query.this);
     //_ReadComic(idComic,chap);
      const comic=await firebaseM.getComicByID(idComic);
      const chapter=comic.chapter[chap-1];
      console.log(chapter);
      let Chapters = await firebaseM.getChapterByID(chapter);
      //console.log(chapters);
      let numberChap=[];
     let i=1;

      for( i;i<=comic.totalChap;i++)
      {
          
          if(i==chap)
          {
            numberChap.push({value: i, isSelect: true});
          }
          else{
            numberChap.push({value: i});
          }
      }
      console.log(numberChap);
      //console.log(numberChap)
      res.render('pages/readcomic', {layout: 'index', data: Chapters, chap: numberChap, idComic: idComic, currentChap: chap})
 }

//  exports.readComicPrevious = async function(req,res){
//     const idComic=req.params.idComic;
//     const chap= currentChap-1;
//     currentChap=currentChap-1;
//     const comic=await firebaseM.getComicByID(idComic);
//       const chapter=comic.chapter[chap-1];
//       console.log(chapter);
//       let Chapters = await firebaseM.getChapterByID(chapter);
//       //console.log(chapters);
//       let numberChap=[];
//      let i=1;
//       for( i;i<=comic.totalChap;i++)
//       {
        
//         if(i==chap)
//         {
//           numberChap.push({value: i, isSelect: true});
//         }
//         else{
//           numberChap.push({value: i});
//         }
//       }
//       //console.log(numberChap)
//       res.render('pages/readcomic', {layout: 'index', data: Chapters, chap:numberChap, idComic: idComic, currentChap:chap})
//  }

//  exports.readComicNext = async function(req,res){
//     const idComic=req.params.idComic;
//     const chap= currentChap+1;
//     currentChap=currentChap+1;
//     const comic=await firebaseM.getComicByID(idComic);
//       const chapter=comic.chapter[chap-1];
//       console.log(chapter);
//       let Chapters = await firebaseM.getChapterByID(chapter);
//       //console.log(chapters);
//       let numberChap=[];
//      let i=1;
//       for( i;i<=comic.totalChap;i++)
//       {
        
//         if(i==chap)
//         {
//           numberChap.push({value: i, isSelect: true});
//         }
//         else{
//           numberChap.push({value: i});
//         }
//       }
//       //console.log(numberChap)
//       res.render('pages/readcomic', {layout: 'index', data: Chapters, chap:numberChap, idComic: idComic, currentChap:currentChap})
//  }

 

//    exports.readComic1 = async function(req,res){
//       const idComic = req.params.idComic;
//       const chap =parseInt(req.query.select);
//       currentChap=chap;
//       console.log(idComic);
//       console.log(chap);
//       //_ReadComic(idComic,chap,req,res);
//        const comic=await firebaseM.getComicByID(idComic);
//        const chapter=comic.chapter[chap-1];
//        console.log(chapter);
//        let Chapters = await firebaseM.getChapterByID(chapter);
//        //console.log(chapters);
//        let numberChap=[];
//       let i=1;
//        for( i;i<=comic.totalChap;i++)
//        {
//            numberChap.push(i);
//        }
//        //console.log(numberChap)
//        res.render('pages/readcomic', {layout: 'index', data: Chapters, chap:numberChap, idComic: idComic, currentChap:currentChap})
//   }
//   _ReadComic= async function(idcomic, numberchap,req,res)
//   {
//       const comic=await firebaseM.getComicByID(idcomic);
//       const chapter=comic.chapter[numberchap-1];
//       console.log(chapter);
//       let Chapters = await firebaseM.getChapterByID(chapter);
//       //console.log(chapters);
//       let numberChap=[];
//      let i=1;
//       for( i;i<=comic.totalChap;i++)
//       {
//           numberChap.push(i);
//       }
//       //console.log(numberChap)
//       res.render('pages/readcomic', {layout: 'index', data: Chapters, chap:numberChap, idComic: idComic, currentChap:currentChap})
//   }