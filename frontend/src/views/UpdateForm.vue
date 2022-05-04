<template>
    <div>
        <h1>글을 작성하는 곳입니다</h1>
        <!--각 id에 맞는 타이틀과 메모를 불러오기-->
        <input type="text" v-model="memo.title">
        <br>
        <textarea cols="30" rows="10" v-model="memo.memo"></textarea>
        <br>

        <!--수정 버튼-->
        <button @click="updatememo">수정</button>
    </div>
</template>


<script>
export default {
    data(){
        return {
            memo : {
                title:"",
                memo:"",
                }
        }
    },
    created() {
        // axios 값을 가져옴 단, id값에 따른 1개의 값 - get
        // 값을 받아와서 this.memo에 저장
        // $route.params.id 를 통해 memo의 id 값 전달
        this.$http.get(`/api/memo/${this.$route.params.id}`)
        .then((response)=>{
             //title과 memo에 id에 맞는 값을 가져오기 
            this.memo = response.data
            
        })
    },

    // get으로 가져온 memo를 수정한 뒤 api 주소로 넣어줄 버튼 put (백엔드가 꺼내씀)
    methods : {
        updatememo() {
            this.$http.put('/api/memo/updateform',{
                data : {
                
                    memo : this.memo
                }
            }).then((response)=>{
                console.log(response.data)
            });
            this.$router.push('/')  //홈으로 돌아감
        }
    }
}

</script>
