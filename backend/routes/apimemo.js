var express = require("express");
const res = require("express/lib/response");
var router = express.Router();
const memos = require("../memo.json");

// memos의 길이 :2
let count = memos.length;

/* 메모리스트를 보내주는 주소 */
router.get("/", function (req, res, next) {
  console.log(memos);
  res.send(memos);
});

/* id 값을 통해 메모를 구분, 노출상관없음, 
   한개의 메모만 보냄 */
router.get("/:id", function (req, res, next) {
  // 파람 id값에는 memo의 id가 담겨있다
  // id값을 통해서 하나의 메모를 찾거나(find) 걸러낸다(filter)
  const id = req.params.id;

  const m = memos.filter((memo) => memo.id == id);

  console.log(m[0]);
  res.send(m[0]);
});

// post로 받아온 값을 memos에 추가(push)
router.post("/writeform", function (req, res, next) {
  // axios로 받아왔다는 조건하에 body.data
  const memo = req.body.data;
  count++;
  const m = {
    id: count,
    title: memo.title,
    memo: memo.memo,
    writer: "익명",
  };
  memos.push(m);
  res.send("ok");
});


//삭제 추가
//메모의 id 값을 프론트엔드에서 delete로 요청
router.delete("/:id",function(req,res,next){
  const id = req.params.id; //memo.id 값으로 memos의 인덱스를 찾아서 삭제
  //보통 DB에서 삭제하는데 memo.json에서 찾기위해서 findIndex 사용
  const i =memos.findIndex((memo)=>memo.id ==id); 

//memos에서도 제거
  memos.splice(i,1);

  console.log(memos);
  res.send(memos);
});



//수정 추가 : put으로 받아온 값 수정
router.put("/updateform",function(req,res,next){
  const memo = req.body.data.memo;
  console.log(memo);

  const i = memos.findIndex((m)=>memo.id==m.id);
  memos[i] = memo;
  res.send("ok");

})



module.exports = router;
